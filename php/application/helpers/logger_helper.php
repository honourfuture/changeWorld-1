<?php

function logger($msg, $type='debug')
{
    if( !DEBUG_MODE ){//非调试模式不记录日志
        return true;
    }
    if( !is_string($msg) ){
        $msg = var_export($msg, true);
    }
    $file = APPPATH . 'logs' . date('Ymd') . "-" . $type . ".log";
    if( !file_exists($file) ){
        mkdir($file, 0766, true);
    }
    $_message = date('Y-m-d H:i:s') . '    ' . $msg . PHP_EOL;
    @file_put_contents($file, $_message, FILE_APPEND | LOCK_EX);
}