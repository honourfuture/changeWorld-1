define({ "api": [
  {
    "type": "post",
    "url": "/api/goods_attr_category/save",
    "title": "商品属性类-编辑 OR 新增",
    "version": "1.0.0",
    "name": "goods_attr_category_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/goods_attr_category/save"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "admin_id",
            "description": "<p>管理员唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>登录账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sign",
            "description": "<p>校验签名</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>记录唯一ID 0表示新增 其他表示编辑</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>导航类名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序 数值小在前</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "enable",
            "description": "<p>启用 1是 0否</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "deleted",
            "description": "<p>是否删除 1是 0否（为1时其他字段可不传）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": \"\",\n\t    \"status\": 0,\n\t    \"message\": \"\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t   \"data\": \"\",\n    \"status\": -1,\n    \"message\": \"签名校验错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Goods_attr_category.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/login",
    "title": "管理员登录",
    "version": "1.0.0",
    "name": "login",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/login"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>唯一登录账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>登录密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.auth",
            "description": "<p>接口认证信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.auth.admin_id",
            "description": "<p>管理员唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.auth.sign",
            "description": "<p>接口签名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.auth.account",
            "description": "<p>管理员账号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.updated_at",
            "description": "<p>最后登录时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.account",
            "description": "<p>管理员账号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.header",
            "description": "<p>管理员头像</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": {\n\t        \"auth\": {\n\t            \"admin_id\": \"1\",\n\t            \"sign\": \"0ec1966af508f2ceda19cf516e03b959\",\n\t            \"account\": \"aicode\"\n\t        },\n\t        \"updated_at\": \"2018-01-08 16:03:47\",\n\t        \"account\": \"aicode\",\n\t        \"header\": \"\"\n\t    },\n\t    \"status\": 0,\n\t    \"message\": \"\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t   \"data\": \"\",\n    \"status\": 3,\n    \"message\": \"登录密码错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Login.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/login_out",
    "title": "管理员退出",
    "version": "1.0.0",
    "name": "login_out",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/login_out"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "admin_id",
            "description": "<p>管理员唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>登录账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sign",
            "description": "<p>校验签名</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": \"\",\n\t    \"status\": 0,\n\t    \"message\": \"\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t   \"data\": \"\",\n    \"status\": -1,\n    \"message\": \"签名校验错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Login_out.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/security_question/save",
    "title": "密保-编辑 OR 新增",
    "version": "1.0.0",
    "name": "security_question_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/security_question/save"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "admin_id",
            "description": "<p>管理员唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>登录账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sign",
            "description": "<p>校验签名</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>记录唯一ID 0表示新增 其他表示编辑</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>密保名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序 数值小在前</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "enable",
            "description": "<p>启用 1是 0否</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "deleted",
            "description": "<p>是否删除 1是 0否（为1时其他字段可不传）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": \"\",\n\t    \"status\": 0,\n\t    \"message\": \"\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t   \"data\": \"\",\n    \"status\": -1,\n    \"message\": \"签名校验错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Security_question.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/shop_class/save",
    "title": "商城导航类-编辑 OR 新增",
    "version": "1.0.0",
    "name": "shop_class_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/shop_class/save"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "admin_id",
            "description": "<p>管理员唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>登录账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sign",
            "description": "<p>校验签名</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>记录唯一ID 0表示新增 其他表示编辑</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>导航类名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序 数值小在前</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "enable",
            "description": "<p>启用 1是 0否</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "deleted",
            "description": "<p>是否删除 1是 0否（为1时其他字段可不传）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": \"\",\n\t    \"status\": 0,\n\t    \"message\": \"\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t   \"data\": \"\",\n    \"status\": -1,\n    \"message\": \"签名校验错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Shop_class.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/common/area",
    "title": "地区",
    "version": "1.0.0",
    "name": "common_area",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/common/area"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pid",
            "description": "<p>上级ID 0表示顶级</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>地区唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>地区名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pid",
            "description": "<p>地区上级ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.first_letter",
            "description": "<p>首字母</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"data\": [\n         {\n              \"id\": \"110000\",\n              \"name\": \"北京\",\n              \"pid\": \"0\",\n              \"first_letter\": \"B\"\n          },\n          {\n              \"id\": \"120000\",\n              \"name\": \"天津\",\n              \"pid\": \"0\",\n              \"first_letter\": \"T\"\n          }\n     ],\n     \"status\": 0,\n     \"message\": \"成功\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"data\": \"\",\n    \"status\": -1,\n    \"message\": \"签名校验错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Common.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/common/sms",
    "title": "短信",
    "version": "1.0.0",
    "name": "common_sms",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/common/sms"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sms_id",
            "description": "<p>短信模板 0注册</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobi",
            "description": "<p>获取验证码手机号</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"data\": \"\",\n     \"status\": 0,\n     \"message\": \"成功\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"data\": \"\",\n    \"status\": 1,\n    \"message\": \"验证码发送频率为: 180秒/次\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Common.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/goods_attr_category",
    "title": "商品属性类-列表",
    "version": "1.0.0",
    "name": "goods_attr_category",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/goods_attr_category"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sign",
            "description": "<p>校验签名</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>商品属性类唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>商品属性类名称</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": [\n\t        {\n\t            \"id\": \"1\",\n\t            \"name\": \"热门\"\n\t        },\n\t        {\n\t            \"id\": \"2\",\n\t            \"name\": \"靓号\"\n\t        }\n\t    ],\n\t    \"status\": 0,\n\t    \"message\": \"成功\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t   \"data\": \"\",\n    \"status\": -1,\n    \"message\": \"签名校验错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Goods_attr_category.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/security_question",
    "title": "密保-列表",
    "version": "1.0.0",
    "name": "security_question",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/security_question"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sign",
            "description": "<p>校验签名</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.question",
            "description": "<p>密保问题列表</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.question.id",
            "description": "<p>密保唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.question.title",
            "description": "<p>密保名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.security",
            "description": "<p>密保答案 json 空置表示没有设置 格式：问题ID：答案</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": {\n\t        \"question\": [\n\t            {\n\t                \"id\": \"1\",\n\t                \"title\": \"你的出生地址\"\n\t            },\n\t            {\n\t                \"id\": \"2\",\n\t                \"title\": \"你的母亲生日\"\n\t            },\n\t            {\n\t                \"id\": \"3\",\n\t                \"title\": \"你的身份证号\"\n\t            }\n\t        ],\n\t        \"security\": \"{\\\"1\\\":\\\"中国\\\", \\\"2\\\":\\\"10.1\\\", \\\"3\\\":\\\"1024\\\"}\"\n\t    },\n\t    \"status\": 0,\n\t    \"message\": \"成功\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t   \"data\": \"\",\n    \"status\": -1,\n    \"message\": \"签名校验错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Security_question.php",
    "groupTitle": "api"
  },
  {
    "type": "post",
    "url": "/api/security_question/query",
    "title": "密保-设置",
    "version": "1.0.0",
    "name": "security_question_query",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/security_question/query"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sign",
            "description": "<p>校验签名</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "security_question",
            "description": "<p>密保问题答案json {密保问题ID:密保答案, 密保问题ID:密保答案}</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": \"\",\n\t    \"status\": 0,\n\t    \"message\": \"\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t   \"data\": \"\",\n    \"status\": -1,\n    \"message\": \"签名校验错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Security_question.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/shop_class",
    "title": "商城导航类-列表",
    "version": "1.0.0",
    "name": "shop_class",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/shop_class"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sign",
            "description": "<p>校验签名</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>商城导航类唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>商城导航类名称</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": [\n\t        {\n\t            \"id\": \"1\",\n\t            \"name\": \"热门\"\n\t        },\n\t        {\n\t            \"id\": \"2\",\n\t            \"name\": \"靓号\"\n\t        }\n\t    ],\n\t    \"status\": 0,\n\t    \"message\": \"成功\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t   \"data\": \"\",\n    \"status\": -1,\n    \"message\": \"签名校验错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Shop_class.php",
    "groupTitle": "api"
  },
  {
    "type": "post",
    "url": "/api/forget/mobi",
    "title": "忘记密码-手机号重设",
    "version": "1.0.0",
    "name": "forget_mobi",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/forget/mobi"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobi",
            "description": "<p>注册手机</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>验证码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>新密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirm_password",
            "description": "<p>确认密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常 设置成功直接登录成功</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.auth",
            "description": "<p>接口认证信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.auth.user_id",
            "description": "<p>用户唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.auth.sign",
            "description": "<p>接口签名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.updated_at",
            "description": "<p>最后登录时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.nickname",
            "description": "<p>用户昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.header",
            "description": "<p>用户头像</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": {\n\t        \"auth\": {\n\t            \"user_id\": \"1\",\n\t            \"sign\": \"ad8550bf1d589f5213a1b13ba051c376\",\n\t        },\n\t        \"updated_at\": \"2018-01-08 16:03:47\",\n\t        \"nickname\": \"aicode\",\n\t        \"header\": \"\"\n\t    },\n\t    \"status\": 0,\n\t    \"message\": \"成功\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t   \"data\": \"\",\n    \"status\": 3,\n    \"message\": \"登录密码错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Forget.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/login",
    "title": "用户登录",
    "version": "1.0.0",
    "name": "login",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/login"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>登录手机/账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>登录密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.auth",
            "description": "<p>接口认证信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.auth.user_id",
            "description": "<p>用户唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.auth.sign",
            "description": "<p>接口签名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.updated_at",
            "description": "<p>最后登录时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.nickname",
            "description": "<p>用户昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.header",
            "description": "<p>用户头像</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": {\n\t        \"auth\": {\n\t            \"user_id\": \"1\",\n\t            \"sign\": \"ad8550bf1d589f5213a1b13ba051c376\",\n\t        },\n\t        \"updated_at\": \"2018-01-08 16:03:47\",\n\t        \"nickname\": \"aicode\",\n\t        \"header\": \"\"\n\t    },\n\t    \"status\": 0,\n\t    \"message\": \"成功\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t   \"data\": \"\",\n    \"status\": 3,\n    \"message\": \"登录密码错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Login.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/login_out",
    "title": "用户退出",
    "version": "1.0.0",
    "name": "login_out",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/login_out"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sign",
            "description": "<p>校验签名</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": \"\",\n\t    \"status\": 0,\n\t    \"message\": \"\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t   \"data\": \"\",\n    \"status\": -1,\n    \"message\": \"签名校验错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Login_out.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/login/qq",
    "title": "QQ登录",
    "version": "1.0.0",
    "name": "login_qq",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/login/qq"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>唯一登录账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>登录密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.auth",
            "description": "<p>接口认证信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.auth.user_id",
            "description": "<p>用户唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.auth.sign",
            "description": "<p>接口签名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.updated_at",
            "description": "<p>最后登录时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.nickname",
            "description": "<p>用户昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.header",
            "description": "<p>用户头像</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": {\n\t        \"auth\": {\n\t            \"user_id\": \"1\",\n\t            \"sign\": \"ad8550bf1d589f5213a1b13ba051c376\",\n\t        },\n\t        \"updated_at\": \"2018-01-08 16:03:47\",\n\t        \"nickname\": \"aicode\",\n\t        \"header\": \"\"\n\t    },\n\t    \"status\": 0,\n\t    \"message\": \"成功\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t   \"data\": \"\",\n    \"status\": 3,\n    \"message\": \"登录密码错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Login.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/login/tourist",
    "title": "匿名登录",
    "version": "1.0.0",
    "name": "login_tourist",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/login/tourist"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "guid",
            "description": "<p>设备唯一码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.auth",
            "description": "<p>接口认证信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.auth.user_id",
            "description": "<p>用户唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.auth.sign",
            "description": "<p>接口签名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.updated_at",
            "description": "<p>最后登录时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.nickname",
            "description": "<p>用户昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.header",
            "description": "<p>用户头像</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": {\n\t        \"auth\": {\n\t            \"user_id\": \"1\",\n\t            \"sign\": \"ad8550bf1d589f5213a1b13ba051c376\",\n\t        },\n\t        \"updated_at\": \"2018-01-08 16:03:47\",\n\t        \"nickname\": \"匿名\",\n\t        \"header\": \"\"\n\t    },\n\t    \"status\": 0,\n\t    \"message\": \"成功\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t   \"data\": \"\",\n    \"status\": 1,\n    \"message\": \"匿名登录参数非法\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Login.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/login/weixin",
    "title": "微信登录",
    "version": "1.0.0",
    "name": "login_weixin",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/login/weixin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>唯一登录账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>登录密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.auth",
            "description": "<p>接口认证信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.auth.user_id",
            "description": "<p>用户唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.auth.sign",
            "description": "<p>接口签名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.updated_at",
            "description": "<p>最后登录时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.nickname",
            "description": "<p>用户昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.header",
            "description": "<p>用户头像</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": {\n\t        \"auth\": {\n\t            \"user_id\": \"1\",\n\t            \"sign\": \"ad8550bf1d589f5213a1b13ba051c376\",\n\t        },\n\t        \"updated_at\": \"2018-01-08 16:03:47\",\n\t        \"nickname\": \"aicode\",\n\t        \"header\": \"\"\n\t    },\n\t    \"status\": 0,\n\t    \"message\": \"成功\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t   \"data\": \"\",\n    \"status\": 3,\n    \"message\": \"登录密码错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Login.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/register",
    "title": "注册-校验手机",
    "version": "1.0.0",
    "name": "register",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/register"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobi",
            "description": "<p>注册手机</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>验证码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": \"\",\n\t    \"status\": 0,\n\t    \"message\": \"\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t   \"data\": \"\",\n    \"status\": 3,\n    \"message\": \"登录密码错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Register.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/register/account",
    "title": "注册-完善账号",
    "version": "1.0.0",
    "name": "register_account",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/register/account"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobi",
            "description": "<p>注册手机</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>验证码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirm_password",
            "description": "<p>确认密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>接口状态 0成功 其他异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>接口信息描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.auth",
            "description": "<p>接口认证信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.auth.user_id",
            "description": "<p>用户唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.auth.sign",
            "description": "<p>接口签名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.updated_at",
            "description": "<p>最后登录时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.nickname",
            "description": "<p>用户账号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.header",
            "description": "<p>用户头像</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": {\n\t        \"auth\": {\n\t            \"user_id\": \"1\",\n\t            \"sign\": \"ad8550bf1d589f5213a1b13ba051c376\",\n\t        },\n\t        \"updated_at\": \"2018-01-08 16:03:47\",\n\t        \"nickname\": \"13430332489\",\n\t        \"header\": \"\"\n\t    },\n\t    \"status\": 0,\n\t    \"message\": \"\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t   \"data\": \"\",\n    \"status\": 3,\n    \"message\": \"登录密码错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Register.php",
    "groupTitle": "user"
  }
] });
