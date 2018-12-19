<?php
/**
 * A base model with a series of CRUD functions (powered by CI's query builder),
 * validation-in-model support, event callbacks and more.
 *
 * @link http://github.com/jamierumbelow/codeigniter-base-model
 * @copyright Copyright (c) 2012, Jamie Rumbelow <http://jamierumbelow.net>
 */
class MY_Model extends CI_Model
{
    /* --------------------------------------------------------------
     * VARIABLES
     * ------------------------------------------------------------ */
    /**
     * This model's default database table. Automatically
     * guessed by pluralising the model name.
     */
    protected $_table;
    /**
     * The database connection object. Will be set to the default
     * connection. This allows individual models to use different DBs
     * without overwriting CI's global $this->db connection.
     */
    public $_database;
    /**
     * This model's default primary key or unique identifier.
     * Used by the get(), update() and delete() functions.
     */
    protected $primary_key = 'id';
    /**
     * Support for soft deletes and this model's 'deleted' key
     */
    protected $soft_delete             = false;
    protected $soft_delete_key         = 'deleted';
    protected $_temporary_with_deleted = false;
    protected $_temporary_only_deleted = false;
    /**
     * The various callbacks available to the model. Each are
     * simple lists of method names (methods will be run on $this).
     */
    protected $before_create       = array();
    protected $after_create        = array();
    protected $before_update       = array();
    protected $after_update        = array();
    protected $before_get          = array();
    protected $after_get           = array();
    protected $before_delete       = array();
    protected $after_delete        = array();
    protected $callback_parameters = array();
    /**
     * Protected, non-modifiable attributes
     */
    protected $protected_attributes = array();
    /**
     * Relationship arrays. Use flat strings for defaults or string
     * => array to customise the class name and primary key
     */
    protected $belongs_to = array();
    protected $has_many   = array();
    protected $_with      = array();
    /**
     * An array of validation rules. This needs to be the same format
     * as validation rules passed to the Form_validation library.
     */
    protected $validate = array();
    /**
     * Optionally skip the validation. Used in conjunction with
     * skip_validation() to skip data validation for any future calls.
     */
    protected $skip_validation = false;
    /**
     * By default we return our results as objects. If we need to override
     * this, we can, or, we could use the `as_array()` and `as_object()` scopes.
     */
    protected $return_type            = 'array';
    protected $_temporary_return_type = null;
    /* --------------------------------------------------------------
     * GENERIC METHODS
     * ------------------------------------------------------------ */
    /**
     * Initialise the model, tie into the CodeIgniter superobject and
     * try our best to guess the table name.
     */
    public function __construct()
    {
        // parent::__construct();
        $this->load->helper('inflector');
        $this->_fetch_table();
        $this->_database = $this->db;
        array_unshift($this->before_create, 'protect_attributes');
        array_unshift($this->before_update, 'protect_attributes');
        $this->_temporary_return_type = $this->return_type;
    }
    /* --------------------------------------------------------------
     * CRUD INTERFACE
     * ------------------------------------------------------------ */
    /**
     * Fetch a single record based on the primary key. Returns an object.
     */
    public function get($primary_value)
    {
        return $this->get_by($this->primary_key, $primary_value);
    }
    /**
     * Fetch a single record based on an arbitrary WHERE call. Can be
     * any valid value to $this->_database->where().
     */
    public function get_by()
    {
        $where = func_get_args();
        if ($this->soft_delete && $this->_temporary_with_deleted !== true) {
            $this->_database->where($this->soft_delete_key, (bool) $this->_temporary_only_deleted);
        }
        $this->_set_where($where);
        $this->trigger('before_get');
        $row = $this->_database->get($this->_table)
            ->{$this->_return_type()}();
        $this->_temporary_return_type = $this->return_type;
        $row                          = $this->trigger('after_get', $row);
        $this->_with                  = array();
        return $row;
    }
    /**
     * Fetch an array of records based on an array of primary values.
     */
    public function get_many($values)
    {
        $this->_database->where_in($this->primary_key, $values);
        return $this->get_all();
    }
    /**
     * Fetch an array of records based on an arbitrary WHERE call.
     */
    public function get_many_by()
    {
        $where = func_get_args();

        $this->_set_where($where);
        return $this->get_all();
    }
    /**
     * Fetch all the records in the table. Can be used as a generic call
     * to $this->_database->get() with scoped methods.
     */
    public function get_all()
    {
        $this->trigger('before_get');
        if ($this->soft_delete && $this->_temporary_with_deleted !== true) {
            $this->_database->where($this->soft_delete_key, (bool) $this->_temporary_only_deleted);
        }
        $result = $this->_database->get($this->_table)
            ->{$this->_return_type(1)}();
        $this->_temporary_return_type = $this->return_type;
        foreach ($result as $key => &$row) {
            $row = $this->trigger('after_get', $row, ($key == count($result) - 1));
        }
        $this->_with = array();
        return $result;
    }
    /**
     * Insert a new row into the table. $data should be an associative array
     * of data to be inserted. Returns newly created ID.
     */
    public function insert($data, $skip_validation = false)
    {
        if ($skip_validation === false) {
            $data = $this->validate($data);
        }
        if ($data !== false) {
            $data = $this->trigger('before_create', $data);
            $this->_database->insert($this->_table, $data);
            $insert_id = $this->_database->insert_id();
            $this->trigger('after_create', $insert_id);
            return $insert_id;
        } else {
            return false;
        }
    }
    /**
     * Insert multiple rows into the table. Returns an array of multiple IDs.
     */
    public function insert_many($data, $skip_validation = false)
    {
        $ids = array();
        foreach ($data as $key => $row) {
            $ids[] = $this->insert($row, $skip_validation, ($key == count($data) - 1));
        }
        return $ids;
    }
    /**
     * Updated a record based on the primary value.
     */
    public function update($primary_value, $data, $skip_validation = false)
    {
        $data = $this->trigger('before_update', $data);
        if ($skip_validation === false) {
            $data = $this->validate($data);
        }
        if ($data !== false) {
            $result = $this->_database->where($this->primary_key, $primary_value)
                ->set($data)
                ->update($this->_table);
            $this->trigger('after_update', array($data, $result));
            return $result;
        } else {
            return false;
        }
    }
    /**
     * Update many records, based on an array of primary values.
     */
    public function update_many($primary_values, $data, $skip_validation = false)
    {
        $data = $this->trigger('before_update', $data);
        if ($skip_validation === false) {
            $data = $this->validate($data);
        }
        if ($data !== false) {
            $result = $this->_database->where_in($this->primary_key, $primary_values)
                ->set($data)
                ->update($this->_table);
            $this->trigger('after_update', array($data, $result));
            return $result;
        } else {
            return false;
        }
    }
    /**
     * Updated a record based on an arbitrary WHERE clause.
     */
    public function update_by()
    {
        $args = func_get_args();
        $data = array_pop($args);
        $data = $this->trigger('before_update', $data);
        if ($this->validate($data) !== false) {
            $this->_set_where($args);
            $result = $this->_database->set($data)
                ->update($this->_table);
            $this->trigger('after_update', array($data, $result));
            return $result;
        } else {
            return false;
        }
    }
    /**
     * Update all records
     */
    public function update_all($data)
    {
        $data   = $this->trigger('before_update', $data);
        $result = $this->_database->set($data)
            ->update($this->_table);
        $this->trigger('after_update', array($data, $result));
        return $result;
    }
    /**
     * Delete a row from the table by the primary value
     */
    public function delete($id)
    {
        $this->trigger('before_delete', $id);
        $this->_database->where($this->primary_key, $id);
        if ($this->soft_delete) {
            $result = $this->_database->update($this->_table, array($this->soft_delete_key => true));
        } else {
            $result = $this->_database->delete($this->_table);
        }
        $this->trigger('after_delete', $result);
        return $result;
    }
    /**
     * Delete a row from the database table by an arbitrary WHERE clause
     */
    public function delete_by()
    {
        $where = func_get_args();
        $where = $this->trigger('before_delete', $where);
        $this->_set_where($where);
        if ($this->soft_delete) {
            $result = $this->_database->update($this->_table, array($this->soft_delete_key => true));
        } else {
            $result = $this->_database->delete($this->_table);
        }
        $this->trigger('after_delete', $result);
        return $result;
    }
    /**
     * Delete many rows from the database table by multiple primary values
     */
    public function delete_many($primary_values)
    {
        $primary_values = $this->trigger('before_delete', $primary_values);
        $this->_database->where_in($this->primary_key, $primary_values);
        if ($this->soft_delete) {
            $result = $this->_database->update($this->_table, array($this->soft_delete_key => true));
        } else {
            $result = $this->_database->delete($this->_table);
        }
        $this->trigger('after_delete', $result);
        return $result;
    }
    /**
     * Truncates the table
     */
    public function truncate()
    {
        $result = $this->_database->truncate($this->_table);
        return $result;
    }
    /* --------------------------------------------------------------
     * RELATIONSHIPS
     * ------------------------------------------------------------ */
    public function with($relationship)
    {
        $this->_with[] = $relationship;
        if (!in_array('relate', $this->after_get)) {
            $this->after_get[] = 'relate';
        }
        return $this;
    }
    public function relate($row)
    {
        if (empty($row)) {
            return $row;
        }
        foreach ($this->belongs_to as $key => $value) {
            if (is_string($value)) {
                $relationship = $value;
                $options      = array('primary_key' => $value . '_id', 'model' => $value . '_model');
            } else {
                $relationship = $key;
                $options      = $value;
            }
            if (in_array($relationship, $this->_with)) {
                $this->load->model($options['model'], $relationship . '_model');
                if (is_object($row)) {
                    $row->{$relationship} = $this->{$relationship . '_model'}->get($row->{$options['primary_key']});
                } else {
                    $row[$relationship] = $this->{$relationship . '_model'}->get($row[$options['primary_key']]);
                }
            }
        }
        foreach ($this->has_many as $key => $value) {
            if (is_string($value)) {
                $relationship = $value;
                $options      = array('primary_key' => singular($this->_table) . '_id', 'model' => singular($value) . '_model');
            } else {
                $relationship = $key;
                $options      = $value;
            }
            if (in_array($relationship, $this->_with)) {
                $this->load->model($options['model'], $relationship . '_model');
                if (is_object($row)) {
                    $row->{$relationship} = $this->{$relationship . '_model'}->get_many_by($options['primary_key'], $row->{$this->primary_key});
                } else {
                    $row[$relationship] = $this->{$relationship . '_model'}->get_many_by($options['primary_key'], $row[$this->primary_key]);
                }
            }
        }
        return $row;
    }
    /* --------------------------------------------------------------
     * UTILITY METHODS
     * ------------------------------------------------------------ */
    /**
     * Retrieve and generate a form_dropdown friendly array
     */
    public function dropdown()
    {
        $args = func_get_args();
        if (count($args) == 2) {
            list($key, $value) = $args;
        } else {
            $key   = $this->primary_key;
            $value = $args[0];
        }
        $this->trigger('before_dropdown', array($key, $value));
        if ($this->soft_delete && $this->_temporary_with_deleted !== true) {
            $this->_database->where($this->soft_delete_key, false);
        }
        $result = $this->_database->select(array($key, $value))
            ->get($this->_table)
            ->result();
        $options = array();
        foreach ($result as $row) {
            $options[$row->{$key}] = $row->{$value};
        }
        $options = $this->trigger('after_dropdown', $options);
        return $options;
    }
    /**
     * Fetch a count of rows based on an arbitrary WHERE call.
     */
    public function count_by()
    {
        if ($this->soft_delete && $this->_temporary_with_deleted !== true) {
            $this->_database->where($this->soft_delete_key, (bool) $this->_temporary_only_deleted);
        }
        $where = func_get_args();
        $this->_set_where($where);
        return $this->_database->count_all_results($this->_table);
    }
    /**
     * Fetch a total count of rows, disregarding any previous conditions
     */
    public function count_all()
    {
        if ($this->soft_delete && $this->_temporary_with_deleted !== true) {
            $this->_database->where($this->soft_delete_key, (bool) $this->_temporary_only_deleted);
        }
        return $this->_database->count_all($this->_table);
    }
    /**
     * Tell the class to skip the insert validation
     */
    public function skip_validation()
    {
        $this->skip_validation = true;
        return $this;
    }
    /**
     * Get the skip validation status
     */
    public function get_skip_validation()
    {
        return $this->skip_validation;
    }
    /**
     * Return the next auto increment of the table. Only tested on MySQL.
     */
    public function get_next_id()
    {
        return (int) $this->_database->select('AUTO_INCREMENT')
            ->from('information_schema.TABLES')
            ->where('TABLE_NAME', $this->_table)
            ->where('TABLE_SCHEMA', $this->_database->database)->get()->row()->AUTO_INCREMENT;
    }
    /**
     * Getter for the table name
     */
    public function table()
    {
        return $this->_table;
    }
    /* --------------------------------------------------------------
     * GLOBAL SCOPES
     * ------------------------------------------------------------ */
    /**
     * Return the next call as an array rather than an object
     */
    public function as_array()
    {
        $this->_temporary_return_type = 'array';
        return $this;
    }
    /**
     * Return the next call as an object rather than an array
     */
    public function as_object()
    {
        $this->_temporary_return_type = 'object';
        return $this;
    }
    /**
     * Don't care about soft deleted rows on the next call
     */
    public function with_deleted()
    {
        $this->_temporary_with_deleted = true;
        return $this;
    }
    /**
     * Only get deleted rows on the next call
     */
    public function only_deleted()
    {
        $this->_temporary_only_deleted = true;
        return $this;
    }
    /* --------------------------------------------------------------
     * OBSERVERS
     * ------------------------------------------------------------ */
    /**
     * MySQL DATETIME created_at and updated_at
     */
    public function created_at($row)
    {
        if (is_object($row)) {
            $row->created_at = date('Y-m-d H:i:s');
        } else {
            $row['created_at'] = date('Y-m-d H:i:s');
        }
        return $row;
    }
    public function updated_at($row)
    {
        if (is_object($row)) {
            $row->updated_at = date('Y-m-d H:i:s');
        } else {
            $row['updated_at'] = date('Y-m-d H:i:s');
        }
        return $row;
    }
    public function updated_valid($row)
    {
        foreach($row as $key=>$val){
            if($val == UPDATE_VALID || $val === ''){
                unset($row[$key]);
            }
        }
        return $row;
    }
    /**
     * Serialises data for you automatically, allowing you to pass
     * through objects and let it handle the serialisation in the background
     */
    public function serialize($row)
    {
        foreach ($this->callback_parameters as $column) {
            $row[$column] = serialize($row[$column]);
        }
        return $row;
    }
    public function unserialize($row)
    {
        foreach ($this->callback_parameters as $column) {
            if (is_array($row)) {
                $row[$column] = unserialize($row[$column]);
            } else {
                $row->$column = unserialize($row->$column);
            }
        }
        return $row;
    }
    /**
     * Protect attributes by removing them from $row array
     */
    public function protect_attributes($row)
    {
        foreach ($this->protected_attributes as $attr) {
            if (is_object($row)) {
                unset($row->$attr);
            } else {
                unset($row[$attr]);
            }
        }
        return $row;
    }
    /* --------------------------------------------------------------
     * QUERY BUILDER DIRECT ACCESS METHODS
     * ------------------------------------------------------------ */
    /**
     * A wrapper to $this->_database->order_by()
     */
    public function order_by($criteria, $order = 'ASC')
    {
        if (is_array($criteria)) {
            foreach ($criteria as $key => $value) {
                $this->_database->order_by($key, $value);
            }
        } else {
            $this->_database->order_by($criteria, $order);
        }
        return $this;
    }
    /**
     * A wrapper to $this->_database->limit()
     */
    public function limit($limit, $offset = 0)
    {
        $this->_database->limit($limit, $offset);
        return $this;
    }
    /* --------------------------------------------------------------
     * INTERNAL METHODS
     * ------------------------------------------------------------ */
    /**
     * Trigger an event and call its observers. Pass through the event name
     * (which looks for an instance variable $this->event_name), an array of
     * parameters to pass through and an optional 'last in interation' boolean
     */
    public function trigger($event, $data = false, $last = true)
    {
        if (isset($this->$event) && is_array($this->$event)) {
            foreach ($this->$event as $method) {
                if (strpos($method, '(')) {
                    preg_match('/([a-zA-Z0-9\_\-]+)(\(([a-zA-Z0-9\_\-\., ]+)\))?/', $method, $matches);
                    $method                    = $matches[1];
                    $this->callback_parameters = explode(',', $matches[3]);
                }
                $data = call_user_func_array(array($this, $method), array($data, $last));
            }
        }
        return $data;
    }
    /**
     * Run validation on the passed data
     */
    public function validate($data)
    {
        if ($this->skip_validation) {
            return $data;
        }
        if (!empty($this->validate)) {
            foreach ($data as $key => $val) {
                $_POST[$key] = $val;
            }
            $this->load->library('form_validation');
            if (is_array($this->validate)) {
                $this->form_validation->set_rules($this->validate);
                if ($this->form_validation->run() === true) {
                    return $data;
                } else {
                    return false;
                }
            } else {
                if ($this->form_validation->run($this->validate) === true) {
                    return $data;
                } else {
                    return false;
                }
            }
        } else {
            return $data;
        }
    }
    /**
     * Guess the table name by pluralising the model name
     */
    private function _fetch_table()
    {
        if ($this->_table == null) {
            $this->_table = plural(preg_replace('/(_m|_model)?$/', '', strtolower(get_class($this))));
        }
    }
    /**
     * Guess the primary key for current table
     */
    private function _fetch_primary_key()
    {
        if ($this->primary_key == null) {
            $this->primary_key = $this->_database->query("SHOW KEYS FROM `" . $this->_table . "` WHERE Key_name = 'PRIMARY'")->row()->Column_name;
        }
    }
    /**
     * Set WHERE parameters, cleverly
     */
    protected function _set_where($params)
    {
        if (count($params) == 1 && is_array($params[0])) {
            foreach ($params[0] as $field => $filter) {
                if (is_array($filter)) {
                    $this->_database->where_in($field, $filter);
                } else {
                    if (is_int($field)) {
                        $this->_database->where($filter);
                    } else {
                        $this->_database->where($field, $filter);
                    }
                }
            }
        } else if (count($params) == 1) {
            $this->_database->where($params[0]);
        } else if (count($params) == 2) {
            if (is_array($params[1])) {
                $this->_database->where_in($params[0], $params[1]);
            } else {
                $this->_database->where($params[0], $params[1]);
            }
        } else if (count($params) == 3) {
            $this->_database->where($params[0], $params[1], $params[2]);
        } else {
            if (is_array($params[1])) {
                $this->_database->where_in($params[0], $params[1]);
            } else {
                $this->_database->where($params[0], $params[1]);
            }
        }
    }
    /**
     * Return the method name for the current return type
     */
    protected function _return_type($multi = false)
    {
        $method = ($multi) ? 'result' : 'row';
        return $this->_temporary_return_type == 'array' ? $method . '_array' : $method;
    }

    public function test_mobi($mobi)
    {
        $test = [
            13723716380,
            13723716382,
            13723716383,
            13723716384,
            13723716385,
            13723716386,
            13723716387,
            13723716388,
            13723716389,
            13430332489,
            13923771616,
            10923771610,
            10923771611,
            10923771612,
            10923771613,
            10923771614,
            10923771615,
            10923771616,
            10923771617,
            10923771618,
            10923771619,
            11923771613,
            11923771610,
            11923771611,
            11923771612,
            11923771613,
            11923771614,
            11923771615,
            11923771616,
            11923771617,
            11923771618,
            11923771619,
            13923771616,
            10923771600,
            10923771601,
            10923771602,
            10923771603,
            10923771604,
            10923771605,
            10923771606,
            10923771607,
            10923771608,
            10923771609,
            11923771603,
            11923771600,
            11923771601,
            11923771602,
            11923771603,
            11923771604,
            11923771605,
            11923771606,
            11923771607,
            11923771608,
            11923771609,
            14776075852,
            10776075852,
            10776075850,
            10776075851,
            10776075853,
            10776075854,
            10776075855,
            10776075856,
            10776075857,
            10776075858,
            10776075859,
            11776075852,
            11776075851,
            11776075850,
            11776075853,
            11776075854,
            11776075855,
            11776075856,
            11776075857,
            11776075858,
            11776075859,
            10411877229,
            10411877220,
            10411877221,
            10411877222,
            10411877223,
            10411877224,
            10411877225,
            10411877226,
            10411877227,
            11411877220,
            11411877221,
            11411877222,
            11411877223,
            11411877224,
            11411877225,
            11411877226,
            11411877227,
            11411877228,
            11411877229,
            11411877200,
            11411877201,
            11411877202,
            11411877203,
            11411877204,
            11411877205,
            11411877206,
            11411877207,
            11411877208,
            11411877209,
            10411877210,
            10411877211,
            10411877212,
            10411877213,
            10411877214,
            10411877215,
            10411877216,
            10411877217,
            10411877218,
            10411877219,
            11411877210,
            11411877211,
            11411877212,
            11411877213,
            11411877214,
            11411877215,
            11411877216,
            11411877217,
            11411877218,
            11411877219,
            11682109310,
            11682109311,
            11682109312,
            11682109313,
            11682109314,
            11682109315,
            11682109316,
            11682109317,
            11682109318,
            11682109319,
            10682109310,
            10682109311,
            10682109312,
            10682109313,
            10682109314,
            10682109315,
            10682109316,
            10682109317,
            10682109318,
            10682109319,
            12682109310,
            12682109311,
            12682109312,
            12682109313,
            12682109314,
            12682109315,
            12682109316,
            12682109317,
            12682109318,
            12682109319,
            11682109320,
            11682109321,
            11682109322,
            11682109323,
            11682109324,
            11682109325,
            11682109326,
            11682109327,
            11682109328,
            11682109329,
            10682109320,
            10682109321,
            10682109322,
            10682109323,
            10682109324,
            10682109325,
            10682109326,
            10682109327,
            10682109328,
            10682109329,
            12682109320,
            12682109321,
            12682109322,
            12682109323,
            12682109324,
            12682109325,
            12682109326,
            12682109327,
            12682109328,
            12682109329,
            11682109331,
            11682109332,
            11682109333,
            11682109334,
            11682109335,
            11682109336,
            11682109337,
            11682109338,
            11682109339,
            10682109330,
            10682109331,
            10682109332,
            10682109333,
            10682109334,
            10682109335,
            10682109336,
            10682109337,
            10682109338,
            10682109339,
            12682109330,
            12682109331,
            12682109332,
            12682109333,
            12682109334,
            12682109335,
            12682109336,
            12682109337,
            12682109338,
            12682109339,
            11682109341,
            11682109342,
            11682109343,
            11682109344,
            11682109345,
            11682109346,
            11682109347,
            11682109348,
            11682109349,
            10682109340,
            10682109341,
            10682109342,
            10682109343,
            10682109344,
            10682109345,
            10682109346,
            10682109337,
            10682109348,
            10682109349,
            12682109340,
            12682109341,
            12682109342,
            12682109343,
            12682109344,
            12682109345,
            12682109346,
            12682109347,
            12682109348,
            12682109349,
            10898595790,
            10898595791,
            10898595792,
            10898595793,
            10898595794,
            10898595795,
            10898595796,
            10898595797,
            10898595798,
            10898595799,
            11898595790,
            11898595791,
            11898595792,
            11898595793,
            11898595794,
            11898595795,
            11898595796,
            11898595797,
            11898595798,
            11898595799,
            12898595790,
            12898595791,
            12898595792,
            12898595793,
            12898595794,
            12898595795,
            12898595796,
            12898595797,
            12898595798,
            12898595799,
            14898595790,
            14898595791,
            14898595792,
            14898595793,
            14898595794,
            14898595795,
            14898595796,
            14898595797,
            14898595798,
            14898595799,
            16898595790,
            16898595791,
            16898595792,
            16898595793,
            16898595794,
            16898595795,
            16898595796,
            16898595797,
            16898595798,
            16898595799,
            10898595700,
            10898595701,
            10898595702,
            10898595703,
            10898595704,
            10898595705,
            10898595706,
            10898595707,
            10898595708,
            10898595709,
            11898595700,
            11898595701,
            11898595702,
            11898595703,
            11898595704,
            11898595705,
            11898595706,
            11898595707,
            11898595708,
            11898595709,
            12898595700,
            12898595701,
            12898595702,
            12898595703,
            12898595704,
            12898595705,
            12898595706,
            12898595707,
            12898595708,
            12898595709,
            14898595700,
            14898595701,
            14898595702,
            14898595703,
            14898595704,
            14898595705,
            14898595706,
            14898595707,
            14898595708,
            14898595709,
            16898595700,
            16898595701,
            16898595702,
            16898595703,
            16898595704,
            16898595705,
            16898595706,
            16898595707,
            16898595708,
            16898595709,
            10808595700,
            10808595701,
            10808595702,
            10808595703,
            10808595704,
            10808595705,
            10808595706,
            10808595707,
            10808595708,
            10808595709,
            11808595700,
            11808595701,
            11808595702,
            11808595703,
            11808595704,
            11808595705,
            11808595706,
            11808595707,
            11808595708,
            11808595709,
            12808595700,
            12808595701,
            12808595702,
            12808595703,
            12808595704,
            12808595705,
            12808595706,
            12808595707,
            12808595708,
            12808595709,
            14809859570,
            14808595701,
            14808595702,
            14808595703,
            14808595704,
            14808595705,
            14808595706,
            14808595707,
            14808595708,
            14808595709,
            16808595700,
            16808595701,
            16808595702,
            16808595703,
            16808595704,
            16808595705,
            16808595706,
            16808595707,
            16808595708,
            16808595709,
            10808505700,
            10808505701,
            10808505702,
            10808505703,
            10808505704,
            10808505705,
            10808505706,
            10808505707,
            10808505708,
            10808505709,
            11808505700,
            11808505701,
            11808505702,
            11808505703,
            11808505704,
            11808505705,
            11808505706,
            11808505707,
            11808505708,
            11808505709,
            12808505700,
            12808505701,
            12808505702,
            12808500703,
            12808505704,
            12808505705,
            12808505706,
            12808505707,
            12808505708,
            12808505709,
            14809809570,
            14808505701,
            14808505702,
            14808505703,
            14808505704,
            14808505705,
            14808505706,
            14808505707,
            14808505708,
            14808505709,
            16808505700,
            16808505701,
            16808505702,
            16808505703,
            16808505704,
            16808505705,
            16808505706,
            16808505707,
            16808505708,
            16808505709,
            10800505700,
            10800505701,
            10800505702,
            10800505703,
            10800505704,
            10800505705,
            10800505706,
            10800505707,
            10800505708,
            10805057090,
            11800850570,
            11800505701,
            11800505702,
            11800505703,
            11800505704,
            11800505705,
            11800505706,
            11800505707,
            11800505708,
            11800505709,
            12800505700,
            12800505701,
            12800505702,
            12800500703,
            12800505704,
            12800505705,
            12800505706,
            12800505707,
            12800505708,
            12800505709,
            14800809570,
            14800505701,
            14800505702,
            14800505703,
            14800505704,
            14800505705,
            14800505706,
            14800505707,
            14800505708,
            14800505709,
            16800505700,
            16800505701,
            16800505702,
            16800505703,
            16800505704,
            16800505705,
            16800505706,
            16800505707,
            16800505708,
            16800505709,
        ];

        if(in_array($mobi, $test)){
            return true;
        }else{
            return false;
        }
    }
}
