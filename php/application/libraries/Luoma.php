<?php
/*
 * 短信类
 * @author sz.ljx
 * @email webljx@163.com
 * @link www.aicode.org.cn
 */
defined('BASEPATH') or exit('No direct script access allowed');

class Luoma
{
    public function logger($msg, $type='debug')
    {
        if( !DEBUG_MODE ){//非调试模式不记录日志
            return true;
        }
        if( !is_string($msg) ){
            $msg = var_export($msg, true);
        }
        $dir = APPPATH . 'logs';
        if( !is_dir($dir) ){
            mkdir($dir, 0766, true);
        }
        $file = $dir . DIRECTORY_SEPARATOR . date('Ymd') . "-" . $type . ".log";
        if( !is_file ){
            touch($file);
        }
        $_message = date('Y-m-d H:i:s') . '    ' . $msg . PHP_EOL;
        @file_put_contents($file, $_message, FILE_APPEND | LOCK_EX);
    }
}