#!/bin/sh
#####################################################
#######     计划任务触发脚本
#######     该脚本配置成每分钟执行一次
#######     环境变量可选参数：development,production,demo,alpha,testing
#####################################################
PHP=/usr/local/php/bin/php

#确定执行环境
CI_ENV="production"
if [[ $1 != "" ]]
then
    CI_ENV=$1;
fi

#确定脚本目录
SOURCE="$0"
while [ -h "$SOURCE"  ]; do # resolve $SOURCE until the file is no longer a symlink
    DIR="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /*  ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
#/确定脚本目录

#init lock dir
LOCKDIR="/tmp/${CI_ENV}/"
if [ ! -d "$LOCKDIR" ]; then
    mkdir -p "$LOCKDIR"
fi

#启动计划任务脚本


PREFIX=${DIR}
STEP=10
for ((i = 0; i < 60; i = (i+STEP) )); do
	flock -xn ${LOCKDIR}php-queue-album_collection.lock -c "CI_ENV=$CI_ENV ${PHP} ${PREFIX}/index.php cron queue album_collection >> ${PREFIX}/application/logs/queue_album_collection.log 2>&1 &"
	sleep $STEP
done