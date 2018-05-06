define({ "api": [
  {
    "type": "get",
    "url": "/api/admin/ad",
    "title": "广告-列表",
    "version": "1.0.0",
    "name": "ad",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/ad"
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
            "description": "<p>广告唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>广告名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.size",
            "description": "<p>广告尺寸</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": [\n\t        {\n\t            \"id\": \"1\",\n\t            \"name\": \"热门\",\n\t \t\t\t\t\"size\": \"300 X 400\",\n\t        },\n\t        {\n\t            \"id\": \"2\",\n\t            \"name\": \"靓号\",\n\t            \"size\": \"300 X 400\",\n\t        }\n\t    ],\n\t    \"status\": 0,\n\t    \"message\": \"成功\"\n\t}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Ad.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/ad_position",
    "title": "广告位-列表",
    "version": "1.0.0",
    "name": "ad_position",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/ad_position"
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
            "description": "<p>广告位唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>广告位名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.size",
            "description": "<p>广告位尺寸</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": [\n\t        {\n\t            \"id\": \"1\",\n\t            \"name\": \"热门\",\n\t \t\t\t\t\"size\": \"300 X 400\",\n\t        },\n\t        {\n\t            \"id\": \"2\",\n\t            \"name\": \"靓号\",\n\t            \"size\": \"300 X 400\",\n\t        }\n\t    ],\n\t    \"status\": 0,\n\t    \"message\": \"成功\"\n\t}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Ad_position.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/admin/ad_position/save",
    "title": "广告位-编辑 OR 新增",
    "version": "1.0.0",
    "name": "ad_position_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/ad_position/save"
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
            "description": "<p>广告位名称</p>"
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
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "size",
            "description": "<p>广告位尺寸</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Ad_position.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/admin/ad/save",
    "title": "广告-编辑 OR 新增",
    "version": "1.0.0",
    "name": "ad_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/ad/save"
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
            "description": "<p>广告名称</p>"
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
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序 降序排列</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": "<p>链接地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>广告图</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "start_time",
            "description": "<p>开始时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "end_time",
            "description": "<p>结束时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ad_position_id",
            "description": "<p>广告位ID</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Ad.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/admin_log",
    "title": "系统日志-列表",
    "version": "1.0.0",
    "name": "admin_log",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/admin_log"
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
          "content": "{\n    \"data\": {\n        \"list\": [\n            {\n                \"id\": \"1\",\n                \"created_at\": \"2018-04-02 15:56:26\",\n                \"updated_at\": \"2018-04-02 15:56:26\",\n                \"deleted\": \"0\",\n                \"status\": \"0\",\n                \"enable\": \"1\",\n                \"sort\": \"0\",\n                \"url\": \"http://ww.baidu.com\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Admin_log.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/album_class/save",
    "title": "专辑类型-编辑 OR 新增",
    "version": "1.0.0",
    "name": "album_class_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/album_class/save"
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
            "description": "<p>专辑类型名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序 降序排列</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Album_class.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/album_tag/save",
    "title": "专辑标签-编辑 OR 新增",
    "version": "1.0.0",
    "name": "album_tag_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/album_tag/save"
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
            "description": "<p>专辑标签名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序 降序排列</p>"
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
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pid",
            "description": "<p>父级ID 0顶级</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>限制选择数量</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Album_tag.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/anchor",
    "title": "主播管理-列表",
    "version": "1.0.0",
    "name": "anchor",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/anchor"
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
            "field": "status",
            "description": "<p>0待审核 1通过 2拒绝 -1全部</p>"
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
          "content": "{\n    \"data\": {\n        \"status\": [\n            \"待审核\",\n            \"已通过\",\n            \"已拒绝\"\n        ],\n        \"count\": 3,\n        \"list\": [\n            {\n                \"id\": \"1\",\n                \"created_at\": \"2018-02-07 11:06:17\",\n                \"updated_at\": \"2018-03-23 09:30:50\",\n                \"status\": \"0\",\n                \"mobi\": \"123123\",\n                \"email\": \"2313@qq.com\",\n                \"nickname\": \"Sad\",\n                \"realname\": \"Qqqqqq\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Anchor.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/anchor_class/save",
    "title": "主播类-编辑 OR 新增",
    "version": "1.0.0",
    "name": "anchor_class_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/anchor_class/save"
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
            "description": "<p>主播类名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序 降序排列</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Anchor_class.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/admin/anchor/save",
    "title": "主播管理--编辑",
    "version": "1.0.0",
    "name": "anchor_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/anchor/save"
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
            "field": "status",
            "description": "<p>1通过 2拒绝</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>申请ID</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Anchor.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/anchor/view",
    "title": "主播管理--详情",
    "version": "1.0.0",
    "name": "anchor_view",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/anchor/view"
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
            "description": "<p>讲师唯一ID</p>"
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
          "content": "{\n    \"data\": {\n        \"id\": \"3\",\n        \"created_at\": \"2018-03-14 11:12:31\",\n        \"updated_at\": \"2018-03-19 14:49:06\",\n        \"deleted\": \"0\",\n        \"status\": \"2\",\n        \"enable\": \"1\",\n        \"mobi\": \"13242424244\",\n        \"email\": \"288484847@qq.com\",\n        \"nickname\": \"3737\",\n        \"realname\": \"呵呵呵\",\n        \"certificate_type\": \"1\",\n        \"certificate_no\": \"8393939933\",\n        \"certificate_photo\": \"/uploads/2018/03/14/147e8912da401d7bf2c9fd097169a3b7.png\",\n        \"class_id\": \"1\",\n        \"summary\": \"444\",\n        \"other\": null,\n        \"anchor_photo\": \"[\\\"/uploads/2018/03/19/d2dcf2cead34b8abd43d5e769ae54042.jpg\\\"]\",\n        \"anchor_video\": null,\n        \"user_id\": \"31\",\n        \"job\": \"\",\n        \"province_id\": \"0\",\n        \"city_id\": \"0\",\n        \"area_id\": \"0\",\n        \"address\": \"\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Anchor.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/app_map",
    "title": "应用引导图-列表",
    "version": "1.0.0",
    "name": "app_map",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/app_map"
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
          "content": "{\n    \"data\": {\n        \"list\": [\n            {\n                \"id\": \"1\",\n                \"created_at\": \"2018-04-02 15:56:26\",\n                \"updated_at\": \"2018-04-02 15:56:26\",\n                \"deleted\": \"0\",\n                \"status\": \"0\",\n                \"enable\": \"1\",\n                \"sort\": \"0\",\n                \"url\": \"http://ww.baidu.com\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/App_map.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/admin/app_map/save",
    "title": "应用引导图-编辑 OR 新增",
    "version": "1.0.0",
    "name": "app_map_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/app_map/save"
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
            "type": "Number",
            "optional": false,
            "field": "enable",
            "description": "<p>启用 1是 0否</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "deleted",
            "description": "<p>是否删除 1是 0否（为1时其他字段可不传）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>链接地址</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/App_map.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/app_version",
    "title": "应用版本-列表",
    "version": "1.0.0",
    "name": "app_version",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/app_version"
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
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.platform",
            "description": "<p>平台</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.channel",
            "description": "<p>渠道</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.list",
            "description": "<p>应用版本列表</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"platform\": [\n            \"IOS\",\n            \"Android\"\n        ],\n        \"channel\": [],\n        \"list\": [\n            {\n                \"id\": \"1\",\n                \"created_at\": \"2018-04-02 15:41:19\",\n                \"updated_at\": \"2018-04-02 15:41:19\",\n                \"deleted\": \"0\",\n                \"enable\": \"1\",\n                \"version\": \"10000\",\n                \"version_alias\": \"0\",\n                \"platform\": \"0\",\n                \"explain\": null,\n                \"url\": \"\",\n                \"channel\": \"0\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/App_version.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/admin/app_version/save",
    "title": "应用版本-编辑 OR 新增",
    "version": "1.0.0",
    "name": "app_version_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/app_version/save"
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
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "version",
            "description": "<p>版本号 整数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version_alias",
            "description": "<p>版本代号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "platform",
            "description": "<p>平台</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "channel",
            "description": "<p>渠道 预留字段</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "explain",
            "description": "<p>版本说明</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>链接地址</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/App_version.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/article_class/save",
    "title": "文章类-编辑 OR 新增",
    "version": "1.0.0",
    "name": "article_class_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/article_class/save"
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
            "description": "<p>文章类名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序 降序排列</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Article_class.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/article/page",
    "title": "文章-单页",
    "version": "1.0.0",
    "name": "article_page",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/article/page"
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
            "description": "<p>接口数据集 键名既是别名参数alias</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"about_us\": \"关于我们\",\n        \"join_us\": \"加入我们\",\n        \"contact_us\": \"联系我们\",\n        \"protocol\": \"用户协议\",\n        \"copyright\": \"版权申明\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Article.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/article/save",
    "title": "文章-编辑 OR 新增",
    "version": "1.0.0",
    "name": "article_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/article/save"
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
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "article_class_id",
            "description": "<p>文章文章类ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "alias",
            "description": "<p>别名 发布文章为空 单页需要传递</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序 降序排列</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Article.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/bank/save",
    "title": "银行-编辑 OR 新增",
    "version": "1.0.0",
    "name": "bank_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/bank/save"
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
            "description": "<p>银行名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序 降序排列</p>"
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
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "icon",
            "description": "<p>银行图标</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "is_hot",
            "description": "<p>热门 0否 1是</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_letter",
            "description": "<p>首字母</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pinyin",
            "description": "<p>拼音</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>背景色 #666666</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Bank.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/config",
    "title": "系统配置-列表",
    "version": "1.0.0",
    "name": "config",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/config"
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
          "content": "{\n    \"data\": {\n\t\t\t\"site_name\": \"爱码网\"\n\t   },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Config.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/config/init",
    "title": "系统配置-查看字段",
    "version": "1.0.0",
    "name": "config_init",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/config/init"
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
          "content": "{\n    \"data\": {\n        \"site_name\": \"站点名称\",\n        \"icp_number\": \"ICP证书号\",\n        \"statistics_code\": \"第三方流量统计代码\",\n        \"copyright\": \"版权信息\",\n        \"site_status\": \"站点状态\",\n        \"closed_reason\": \"关闭原因\",\n        \"phone\": \"客服联系电话\",\n        \"email\": \"电子邮件\",\n        \"image_max_filesize\": \"图片文件大小\",\n        \"image_allow_ext\": \"文件扩展名\",\n        \"email_host\": \"SMTP 服务器\",\n        \"email_port\": \"SMTP 端口\",\n        \"email_addr\": \"发信人邮件地址\",\n        \"email_id\": \"SMTP 身份验证用户名\",\n        \"email_pass\": \"SMTP 身份验证密码\",\n        \"email_test\": \"测试接收的邮件地址\",\n        \"search_words\": \"默认搜索\",\n        \"logo_image\": \"网站Logo\",\n        \"buyer_image\": \"会员中心Logo\",\n        \"seller_image\": \"商家中心Logo\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Config.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/admin/config/save",
    "title": "系统配置-编辑 OR 新增",
    "version": "1.0.0",
    "name": "config_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/config/save"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Config.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/express/save",
    "title": "快递公司-编辑 OR 新增",
    "version": "1.0.0",
    "name": "express_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/express/save"
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
            "description": "<p>排序 降序排列</p>"
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
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>状态 0初始化 1常用 其他</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pinyin",
            "description": "<p>拼音首字母</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "com",
            "description": "<p>快递公司代码</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Express.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/feedback",
    "title": "意见反馈-列表",
    "version": "1.0.0",
    "name": "feedback",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/feedback"
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
            "description": "<p>意见反馈唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>意见反馈名称</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Feedback.php",
    "groupTitle": "admin"
  },
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
            "description": "<p>排序 降序排列</p>"
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
    "type": "post",
    "url": "/api/goods_class/save",
    "title": "商品分类-编辑 OR 新增",
    "version": "1.0.0",
    "name": "goods_class_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/goods_class/save"
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
            "field": "nam",
            "description": "<p>商品分类名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序 降序排列</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Goods_class.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/grade",
    "title": "等级经验设置-列表",
    "version": "1.0.0",
    "name": "grade",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/grade"
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
            "description": "<p>等级经验设置唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.grade_name",
            "description": "<p>等级名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.grade_demand",
            "description": "<p>晋级值</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.grade_logo",
            "description": "<p>等级图片</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": [\n\t        {\n\t            \"id\": \"1\",\n\t            \"grade_name\": \"热门\",\n\t \t\t\t\t\"grade_demand\": \"500\",\n\t \t\t\t\t\"grade_logo\": \"\",\n\t        }\n\t    ],\n\t    \"status\": 0,\n\t    \"message\": \"成功\"\n\t}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Grade.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/grade_rule",
    "title": "等级经验规则-列表",
    "version": "1.0.0",
    "name": "grade_rule",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/grade_rule"
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
          "content": "{\n    \"data\": {\n\t\t\t\"grade_login\": \"50\",\n\t\t\t\"grade_evaluate\": \"20\"\n\t   },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Grade_rule.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/admin/grade_rule/save",
    "title": "等级经验规则-编辑 OR 新增",
    "version": "1.0.0",
    "name": "grade_rule_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/grade_rule/save"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Grade_rule.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/admin/grade/save",
    "title": "等级经验设置-编辑 OR 新增",
    "version": "1.0.0",
    "name": "grade_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/grade/save"
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
            "field": "grade_name",
            "description": "<p>等级经验设置等级名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "grade_demand",
            "description": "<p>晋级值</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "grade_logo",
            "description": "<p>等级图</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Grade.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/live_class/save",
    "title": "直播类-编辑 OR 新增",
    "version": "1.0.0",
    "name": "live_class_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/live_class/save"
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
            "description": "<p>直播类名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序 降序排列</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Live_class.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/live_gift/save",
    "title": "直播礼物-编辑 OR 新增",
    "version": "1.0.0",
    "name": "live_gift_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/live_gift/save"
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
            "description": "<p>直播礼物名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "img",
            "description": "<p>直播礼物图</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "exchange_type",
            "description": "<p>兑换类型 1金币 2积分</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>兑换数量</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序 降序排列</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Live_gift.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/live_tag/save",
    "title": "直播标签-编辑 OR 新增",
    "version": "1.0.0",
    "name": "live_tag_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/live_tag/save"
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
            "description": "<p>直播标签名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序 降序排列</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Live_tag.php",
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
    "url": "/api/mailbox/save",
    "title": "站内信-编辑 OR 新增",
    "version": "1.0.0",
    "name": "mailbox_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/mailbox/save"
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
            "type": "Number",
            "optional": false,
            "field": "deleted",
            "description": "<p>是否删除 1是 0否（为1时其他字段可不传）</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序 降序排列</p>"
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
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>消息标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "summary",
            "description": "<p>消息摘要</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>消息详情</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Mailbox.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/order",
    "title": "订单管理-列表",
    "version": "1.0.0",
    "name": "order",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/order"
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
            "field": "status",
            "description": "<p>-1全部</p>"
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
          "content": "{\n    \"data\": {},\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Order.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/order_evaluate",
    "title": "评价管理-列表",
    "version": "1.0.0",
    "name": "order_evaluate",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/order_evaluate"
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
            "field": "status",
            "description": "<p>-1全部</p>"
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
          "content": "{\n    \"data\": {},\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Order_evaluate.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/order_refund",
    "title": "退款/退单-列表",
    "version": "1.0.0",
    "name": "order_refund",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/order_refund"
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
            "field": "status",
            "description": "<p>-1全部</p>"
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
          "content": "{\n    \"data\": {},\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Order_refund.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/order/view",
    "title": "订单管理-详情",
    "version": "1.0.0",
    "name": "order_view",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/order/view"
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
            "description": "<p>用户唯一ID</p>"
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
          "content": "{\n    \"data\": {},\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Order.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/partner_city",
    "title": "城市合伙人-待审核",
    "version": "1.0.0",
    "name": "partner_city",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/partner_city"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"nickname\": \"aicode\",\n        \"header\": \"\",\n        \"check_city_partners\": \"0\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Partner_city.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/admin/partner_city/save",
    "title": "城市合伙人-审核",
    "version": "1.0.0",
    "name": "partner_city_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/partner_city/save"
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
            "description": "<p>记录唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "check_status",
            "description": "<p>审核状态 0不通过 2通过</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Partner_city.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/points_rule",
    "title": "积分规则-列表",
    "version": "1.0.0",
    "name": "points_rule",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/points_rule"
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
          "content": "{\n    \"data\": {\n\t\t\t\"points_reg\": \"会员注册\",\n\t\t\t\"points_login\": \"会员登录\"\n\t   },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Points_rule.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/admin/points_rule/save",
    "title": "积分规则-编辑 OR 新增",
    "version": "1.0.0",
    "name": "points_rule_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/points_rule/save"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Points_rule.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/pretty",
    "title": "靓号-列表",
    "version": "1.0.0",
    "name": "pretty",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/pretty"
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
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.pretty",
            "description": "<p>靓号列表</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pretty.id",
            "description": "<p>靓号序号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pretty.created_at",
            "description": "<p>靓号创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pretty.updated_at",
            "description": "<p>靓号更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pretty.deleted",
            "description": "<p>删除 0否 1是</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pretty.status",
            "description": "<p>状态 0初始化 其他</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pretty.enable",
            "description": "<p>启用 1是 0否</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pretty.sort",
            "description": "<p>排序 降序</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pretty.pretty_id",
            "description": "<p>靓号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pretty.pretty_count",
            "description": "<p>靓号位数</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pretty.price",
            "description": "<p>价格</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pretty.buyer_id",
            "description": "<p>购买用户ID 0表示未卖出 同用户字段序号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pretty.is_pretty",
            "description": "<p>是否靓号 0否 1是</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.user",
            "description": "<p>靓号购买用户</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user.nickname",
            "description": "<p>用户昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user.header",
            "description": "<p>用户头像</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"user\": {\n            \"1\": {\n                \"nickname\": \"aicode\",\n                \"header\": \"\"\n            }\n        },\n        \"pretty\": {\n            \"count\": 1,\n            \"list\": [\n                {\n                    \"id\": \"1\",\n                    \"created_at\": \"2018-01-20 12:42:49\",\n                    \"updated_at\": \"2018-01-20 12:45:41\",\n                    \"deleted\": \"0\",\n                    \"status\": \"0\",\n                    \"enable\": \"1\",\n                    \"sort\": \"0\",\n                    \"pretty_id\": \"10000\",\n                    \"pretty_count\": \"5\",\n                    \"price\": \"5000.00\",\n                    \"buyer_id\": \"1\",\n                    \"is_pretty\": \"1\"\n                }\n            ]\n        }\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Pretty.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/admin/pretty/save",
    "title": "靓号-编辑 OR 新增",
    "version": "1.0.0",
    "name": "pretty_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/pretty/save"
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
            "description": "<p>记录唯一ID 0表示新增 其他表示编辑(靓号禁止编辑)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序 降序排列</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pretty_id",
            "description": "<p>靓号</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>价格</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "is_pretty",
            "description": "<p>是否靓号 0否 1是</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Pretty.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/recharge",
    "title": "充值优惠-列表",
    "version": "1.0.0",
    "name": "recharge",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/recharge"
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
            "description": "<p>充值优惠唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "money",
            "description": "<p>充</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "free",
            "description": "<p>送金额</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": [\n        {\n            \"id\": \"1\",\n            \"created_at\": \"2018-03-16 14:30:08\",\n            \"updated_at\": \"2018-03-16 14:30:08\",\n            \"deleted\": \"0\",\n            \"status\": \"0\",\n            \"enable\": \"1\",\n            \"sort\": \"0\",\n            \"money\": \"500.00\",\n            \"free\": \"50.00\"\n        }\n    ],\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Recharge.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/admin/recharge/save",
    "title": "充值优惠-编辑 OR 新增",
    "version": "1.0.0",
    "name": "recharge_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/recharge/save"
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
            "field": "money",
            "description": "<p>充</p>"
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
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "free",
            "description": "<p>送金额</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Recharge.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/search_words/save",
    "title": "热搜词-编辑 OR 新增",
    "version": "1.0.0",
    "name": "search_words_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/search_words/save"
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
            "field": "keyword",
            "description": "<p>搜索词</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序 降序排列</p>"
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
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword_alias",
            "description": "<p>显示词</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Search_words.php",
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
            "description": "<p>排序 降序排列</p>"
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
    "url": "/api/admin/shop/check",
    "title": "店铺管理-审核",
    "version": "1.0.0",
    "name": "shop_check",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/shop/check"
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
            "field": "status",
            "description": "<p>1通过 2拒绝</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>申请ID</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Shop.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/shop/check_list",
    "title": "店铺管理-待审核列表",
    "version": "1.0.0",
    "name": "shop_check_list",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/shop/check_list"
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
            "field": "status",
            "description": "<p>0待审核 1通过 2拒绝 -1全部</p>"
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
          "content": "{\n    \"data\": {\n        \"status\": [\n            \"待审核\",\n            \"通过\",\n            \"拒绝\"\n        ],\n        \"total\": 1,\n        \"list\": [\n            {\n                \"mobi\": \"13430332489\",\n                \"sex\": \"0\",\n                \"header\": \"/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png\",\n                \"nickname\": \"aicode\",\n                \"summary\": \"\",\n                \"v\": \"0\",\n                \"exp\": \"0\",\n                \"id\": \"1\",\n                \"created_at\": \"2018-03-30 23:20:50\",\n                \"updated_at\": \"2018-03-30 23:20:52\",\n                \"status\": \"0\",\n                \"user_id\": \"1\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Shop.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/user",
    "title": "用户管理-列表",
    "version": "1.0.0",
    "name": "user",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/user"
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
          "content": "{\n    \"data\": {},\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/User.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/user/view",
    "title": "用户管理-详情",
    "version": "1.0.0",
    "name": "user_view",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/user/view"
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
            "description": "<p>用户唯一ID</p>"
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
          "content": "{\n    \"data\": {},\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/User.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/users_points/save",
    "title": "积分增减",
    "version": "1.0.0",
    "name": "users_points_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/users_points/save"
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
            "field": "c_user_id",
            "description": "<p>会员唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>类型 1增 2减</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "points",
            "description": "<p>积分值</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "remark",
            "description": "<p>操作备注</p>"
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
          "content": "{\n    \"data\": {\n\t\t\t\"points_reg\": \"会员注册\",\n\t\t\t\"points_login\": \"会员登录\"\n\t   },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Users_points.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/vip",
    "title": "贵族-列表",
    "version": "1.0.0",
    "name": "vip",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/vip"
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
            "description": "<p>贵族唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>贵族名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.first_fee",
            "description": "<p>首开费用</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.first_gold",
            "description": "<p>首开金币</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.renew_fee",
            "description": "<p>续费费用</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.renew_gold",
            "description": "<p>续费金币</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": [\n        {\n            \"id\": \"1\",\n            \"created_at\": \"2018-03-28 15:39:31\",\n            \"updated_at\": \"2018-03-28 15:42:09\",\n            \"deleted\": \"0\",\n            \"enable\": \"1\",\n            \"sort\": \"0\",\n            \"name\": \"男爵\",\n            \"first_fee\": \"100.00\",\n            \"first_gold\": \"10000\",\n            \"renew_fee\": \"80.00\",\n            \"renew_gold\": \"12000\",\n            \"icon\": \"\"\n        }\n    ],\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Vip.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/admin/vip/save",
    "title": "贵族-编辑 OR 新增",
    "version": "1.0.0",
    "name": "vip_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/vip/save"
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
            "type": "Number",
            "optional": false,
            "field": "deleted",
            "description": "<p>是否删除 1是 0否（为1时其他字段可不传）</p>"
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
            "field": "sort",
            "description": "<p>排序 降序</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>贵族名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_fee",
            "description": "<p>首开费用</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_gold",
            "description": "<p>首开金币</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "renew_fee",
            "description": "<p>续费费用</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "renew_gold",
            "description": "<p>续费金币</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "icon",
            "description": "<p>icon图标</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "days",
            "description": "<p>有效期天数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "unit",
            "description": "<p>有效期单位</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Vip.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/admin/withdraw/record",
    "title": "提现管理-记录",
    "version": "1.0.0",
    "name": "withdraw_record",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/withdraw/record"
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
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>记录ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.created_at",
            "description": "<p>申请时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.status",
            "description": "<p>状态 0待处理 1已汇款 2异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.admin_name",
            "description": "<p>收款人</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"count\": 1,\n        \"list\": [\n            {\n                \"id\": \"3\",\n                \"created_at\": \"2018-03-23 10:22:22\",\n                \"status\": \"0\",\n                \"admin_name\": \"sz.ljx\",\n                \"admin_card\": \"112233445566778899\",\n                \"mobi\": \"13830332488\",\n                \"bank_name\": \"工商银行\",\n                \"amount\": \"100.00\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Withdraw.php",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/api/admin/withdraw/save",
    "title": "提现管理-操作",
    "version": "1.0.0",
    "name": "withdraw_save",
    "group": "admin",
    "sampleRequest": [
      {
        "url": "/api/admin/withdraw/save"
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
            "type": "String",
            "optional": false,
            "field": "s_id",
            "description": "<p>记录唯一ID 多个英文逗号分割：1,2,3</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>状态 0待处理 1已汇款 2异常</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/admin/Withdraw.php",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/api/address",
    "title": "个人地址-列表",
    "version": "1.0.0",
    "name": "address",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/address"
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
            "description": "<p>个人地址唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.is_default",
            "description": "<p>是否默认地址 0否 1是</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.username",
            "description": "<p>收货人</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.mobi",
            "description": "<p>联系电话</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.province_id",
            "description": "<p>省ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.province",
            "description": "<p>省名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.city_id",
            "description": "<p>市ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.city",
            "description": "<p>市名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.area_id",
            "description": "<p>地区ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.area",
            "description": "<p>地区名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.address",
            "description": "<p>详细地址</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n      {\n          \"id\": \"3\",\n          \"is_default\": \"1\",\n          \"username\": \"龙建新-1024\",\n          \"mobi\": \"13430332489\",\n          \"province_id\": \"110000\",\n          \"province\": \"北京市\",\n          \"city_id\": \"110101\",\n          \"city\": \"东城区\",\n          \"area_id\": \"0\",\n          \"area\": \"\",\n          \"address\": \"清华园1024号\",\n      }\n ],\n \"status\": 0,\n \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Address.php",
    "groupTitle": "api"
  },
  {
    "type": "post",
    "url": "/api/address/save",
    "title": "个人地址-编辑 OR 新增",
    "version": "1.0.0",
    "name": "address_save",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/address/save"
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
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>记录唯一ID 0表示新增 其他表示编辑</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "deleted",
            "description": "<p>是否删除 1是 0否（为1时其他字段可不传）</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "is_default",
            "description": "<p>默认设置 1是 0否</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>收货人</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobi",
            "description": "<p>联系电话</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "province_id",
            "description": "<p>省ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "province",
            "description": "<p>省名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "city_id",
            "description": "<p>市ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>市名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "area_id",
            "description": "<p>区ID 没有传0</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "area",
            "description": "<p>区名称 没有传空</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>详细地址</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Address.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/album_class",
    "title": "专辑类型-列表",
    "version": "1.0.0",
    "name": "album_class",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/album_class"
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
            "description": "<p>专辑类型唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>专辑类型名称</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Album_class.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/album_tag",
    "title": "专辑标签-列表",
    "version": "1.0.0",
    "name": "album_tag",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/album_tag"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"1\": {\n            \"name\": \"内容\",\n            \"limit\": \"3\",\n            \"list\": [\n                {\n                    \"6\": \"广告\"\n                },\n                {\n                    \"5\": \"铃声\"\n                },\n                {\n                    \"4\": \"配音\"\n                },\n                {\n                    \"3\": \"声音日记\"\n                }\n            ]\n        },\n        \"2\": {\n            \"name\": \"播讲\",\n            \"limit\": \"2\",\n            \"list\": [\n                {\n                    \"8\": \"体育\"\n                },\n                {\n                    \"7\": \"广告\"\n                },\n                {\n                    \"9c\": \"天天快递\"\n                }\n            ]\n        }\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Album_tag.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/album/view",
    "title": "专辑详情",
    "version": "1.0.0",
    "name": "album_view",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/album/view"
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
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>专辑ID</p>"
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
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>专辑ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.cover_image",
            "description": "<p>专辑背景图</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.updated_at",
            "description": "<p>专辑更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.title",
            "description": "<p>专辑标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.price",
            "description": "<p>专辑打包价</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.album_class_name",
            "description": "<p>专辑类名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.audio_num",
            "description": "<p>专辑音频数量</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.play_times",
            "description": "<p>专辑总播放次数</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.nickname",
            "description": "<p>主播昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.header",
            "description": "<p>主播头像</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.has_favorite",
            "description": "<p>是否订阅 0否 1是</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.favorite",
            "description": "<p>订阅总数</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.audio",
            "description": "<p>专辑音频列表</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"id\": \"7\",\n        \"cover_image\": \"/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png\",\n        \"updated_at\": \"2018-03-01 14:11:29\",\n        \"title\": \"你的出生地址\",\n        \"album_class\": \"3\",\n        \"album_tag\": \",配音,铃声,\",\n        \"price\": \"10000.00\",\n        \"public\": \"1\",\n        \"anchor_uid\": \"1\",\n        \"album_class_name\": \"知识\",\n        \"audio_num\": \"1\",\n        \"play_times\": \"0\",\n        \"nickname\": \"aicode\",\n        \"header\": \"\",\n        \"has_favorite\": 0,\n        \"favorite\": 0,\n        \"audio\": [\n            {\n                \"id\": \"3\",\n                \"cover_image\": \"/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png\",\n                \"price\": \"10000.00\",\n                \"title\": \"你的出生地址\",\n                \"created_at\": \"2018-03-01 12:08:06\",\n                \"duration\": \"404\",\n                \"video_url\": \"http://1253104369.vod2.myqcloud.com/26be7741vodgzp1253104369/f0.flv\",\n                \"play_times\": \"0\",\n                \"comment\": 0\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Album.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/anchor_class",
    "title": "主播类-列表",
    "version": "1.0.0",
    "name": "anchor_class",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/anchor_class"
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
            "description": "<p>主播类唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>主播类名称</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Anchor_class.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/article",
    "title": "文章-列表",
    "version": "1.0.0",
    "name": "article",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/article"
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
            "type": "Number",
            "optional": false,
            "field": "article_class_id",
            "description": "<p>文章类ID 0表示所有</p>"
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
            "type": "String",
            "optional": false,
            "field": "data.count",
            "description": "<p>文章数量</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.list",
            "description": "<p>接口数据集</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.id",
            "description": "<p>文章唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.title",
            "description": "<p>文章标题</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": [\n\t        {\n\t            \"id\": \"1\",\n\t            \"title\": \"热门\"\n\t        },\n\t        {\n\t            \"id\": \"2\",\n\t            \"title\": \"靓号\"\n\t        }\n\t    ],\n\t    \"status\": 0,\n\t    \"message\": \"成功\"\n\t}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Article.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/article_class",
    "title": "文章类-列表",
    "version": "1.0.0",
    "name": "article_class",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/article_class"
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
            "type": "String",
            "optional": false,
            "field": "page",
            "description": "<p>页面展示类，不传取所有 帮助：help</p>"
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
            "description": "<p>文章类唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>文章类名称</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Article_class.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/article/page_view",
    "title": "文章-单页查看",
    "version": "1.0.0",
    "name": "article_page_view",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/article/page_view"
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
            "type": "String",
            "optional": false,
            "field": "alias",
            "description": "<p>别名 {&quot;about_us&quot;:&quot;关于我们&quot;,&quot;join_us&quot;:&quot;加入我们&quot;,&quot;contact_us&quot;:&quot;联系我们&quot;,&quot;protocol&quot;:&quot;用户协议&quot;,&quot;copyright&quot;:&quot;版权申明&quot;}</p>"
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
            "description": "<p>文章唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.content",
            "description": "<p>文章详情</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": {\n\t        \"id\": \"1\",\n\t        \"title\": \"热门\",\n\t        \"content\": \"热门\"\n\t    },\n\t    \"status\": 0,\n\t    \"message\": \"成功\"\n\t}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Article.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/article/view",
    "title": "文章-查看",
    "version": "1.0.0",
    "name": "article_view",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/article/view"
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
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>文章ID</p>"
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
            "description": "<p>文章唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.content",
            "description": "<p>文章详情</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": {\n\t        \"id\": \"1\",\n\t        \"title\": \"热门\",\n\t        \"content\": \"热门\"\n\t    },\n\t    \"status\": 0,\n\t    \"message\": \"成功\"\n\t}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Article.php",
    "groupTitle": "api"
  },
  {
    "type": "post",
    "url": "/api/audio/download",
    "title": "音频-下载",
    "version": "1.0.0",
    "name": "audio_download",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/audio/download"
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
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>音频ID</p>"
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
          "content": "{\n    \"data\": {},\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Audio.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/audio/history",
    "title": "音频-历史",
    "version": "1.0.0",
    "name": "audio_history",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/audio/history"
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
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>音频ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.duration",
            "description": "<p>时长 秒</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.file_size",
            "description": "<p>文件大小</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.video_url",
            "description": "<p>音频地址</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.title",
            "description": "<p>音频标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.price",
            "description": "<p>音频价格</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.cover_image",
            "description": "<p>音频背景图</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"count\": 1,\n        \"list\": [\n            {\n                \"id\": \"3\",\n                \"duration\": \"404\",\n                \"file_size\": \"26305965\",\n                \"video_url\": \"http://1253104369.vod2.myqcloud.com/26be7741vodgzp1253104369/46a1b7707447398154874610391/f0.flv\",\n                \"title\": \"你的出生地址\",\n                \"price\": \"10000.00\",\n                \"cover_image\": \"/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Audio.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/audio/play",
    "title": "音频-播放页",
    "version": "1.0.0",
    "name": "audio_play",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/audio/play"
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
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>音频ID</p>"
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
            "field": "data.audio",
            "description": "<p>音频信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.user",
            "description": "<p>主播信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.album",
            "description": "<p>专辑信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"audio\": {\n            \"id\": \"3\",\n            \"duration\": \"404\",\n            \"file_size\": \"26305965\",\n            \"video_url\": \"http://1253104369.vod2.myqcloud.com/26be7741vodgzp1253104369/46a1b7707447398154874610391/f0.flv\",\n            \"anchor_uid\": \"1\",\n            \"album_id\": \"7\",\n            \"title\": \"你的出生地址\",\n            \"price\": \"10000.00\",\n            \"cover_image\": \"/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png\",\n            \"play_times\": \"0\",\n            \"has_favorite\": 0,\n            \"favorite\": 0,\n            \"comment\": 0\n        },\n        \"user\": {\n            \"nickname\": \"aicode\",\n            \"header\": \"/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png\",\n            \"v\": \"0\"\n        },\n        \"album\": {\n            \"cover_image\": \"/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png\",\n            \"title\": \"你的出生地址\",\n            \"has_favorite\": 1,\n            \"favorite\": 1\n        }\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Audio.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/bank",
    "title": "银行-列表",
    "version": "1.0.0",
    "name": "bank",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/bank"
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
            "type": "String",
            "optional": false,
            "field": "page",
            "description": "<p>页面展示类，不传取所有 帮助：help</p>"
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
            "description": "<p>银行唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>银行名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.icon",
            "description": "<p>银行图标</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.first_letter",
            "description": "<p>首字母</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.pinyin",
            "description": "<p>拼音</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.color",
            "description": "<p>背景色</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Bank.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/chat/token",
    "title": "融云-获取token",
    "version": "1.0.0",
    "name": "chat_token",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/chat/token"
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
            "type": "String",
            "optional": false,
            "field": "data.token",
            "description": "<p>融云token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"token\": \"OV/rMsT5+bU8tsuVLAExKFPVSOwECud2tsMN8Xc0GyUbpMpKxxspaz7dwTRsWKWa2sMrptl+mtrN6oRHZET/Rw==\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Chat.php",
    "groupTitle": "api"
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
    "type": "post",
    "url": "/api/common/base64FileUpload",
    "title": "base64File文件上传",
    "version": "1.0.0",
    "name": "common_base64FileUpload",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/common/base64FileUpload"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "base64_image_content",
            "description": "<p>base64文件编码</p>"
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
            "type": "String",
            "optional": false,
            "field": "data.file_url",
            "description": "<p>文件相对网络路径</p>"
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
          "content": "{\n    \"data\": \"\",\n    \"status\": 1,\n    \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Common.php",
    "groupTitle": "api"
  },
  {
    "type": "post",
    "url": "/api/common/fileUpload",
    "title": "File文件上传",
    "version": "1.0.0",
    "name": "common_fileUpload",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/common/fileUpload"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "field",
            "description": "<p>file控件名称</p>"
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
            "type": "String",
            "optional": false,
            "field": "data.file_url",
            "description": "<p>文件相对网络路径</p>"
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
          "content": "{\n    \"data\": \"\",\n    \"status\": 1,\n    \"message\": \"\"\n}",
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
            "description": "<p>短信模板 0注册 1找回密码 2绑定</p>"
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
    "url": "/api/express",
    "title": "快递公司-列表",
    "version": "1.0.0",
    "name": "express",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/express"
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
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>状态 1常用 其他不限</p>"
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
            "description": "<p>快递公司唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>快递公司名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.com",
            "description": "<p>快递公司代码</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": [\n\t        {\n\t            \"id\": \"1\",\n\t            \"name\": \"热门\",\n\t            \"com\": \"yuantong\"\n\t        },\n\t        {\n\t            \"id\": \"2\",\n\t            \"name\": \"靓号\",\n\t            \"com\": \"yuantong\"\n\t        }\n\t    ],\n\t    \"status\": 0,\n\t    \"message\": \"成功\"\n\t}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Express.php",
    "groupTitle": "api"
  },
  {
    "type": "post",
    "url": "/api/user/gold/add",
    "title": "转余额-提交",
    "version": "1.0.0",
    "name": "gold_add",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/user/gold/add"
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
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>转余额金币量</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Gold.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/goods",
    "title": "商品-列表",
    "version": "1.0.0",
    "name": "goods",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/goods"
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
            "type": "Object",
            "optional": false,
            "field": "data.user",
            "description": "<p>发布用户</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user.nickname",
            "description": "<p>用户昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user.header",
            "description": "<p>用户头像</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.goods",
            "description": "<p>商品</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.goods.count",
            "description": "<p>商品总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.goods.list",
            "description": "<p>商品列表</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.id",
            "description": "<p>商品唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.created_at",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.updated_at",
            "description": "<p>更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.status",
            "description": "<p>状态 0初始化 1下架 其他</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.enable",
            "description": "<p>启用 1是 0否</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.sort",
            "description": "<p>排序 降序</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.name",
            "description": "<p>商品名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.stock",
            "description": "<p>库存</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.sale_price",
            "description": "<p>销售价</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.freight_fee",
            "description": "<p>邮费</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.send_mode",
            "description": "<p>发货模式</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.use_point_rate",
            "description": "<p>最大积分使用量</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.e_invoice",
            "description": "<p>支持电子发票 0否 1是</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.city_partner_rate",
            "description": "<p>城市合伙人分销比例</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.goods_detail",
            "description": "<p>商品详情</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.goods_image",
            "description": "<p>商品主图</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.goods_attr",
            "description": "<p>商品属性</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.goods_ticket",
            "description": "<p>优惠券</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods.list.goods_class_id",
            "description": "<p>商品分类ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"user\": {\n            \"1\": {\n                \"nickname\": \"aicode\",\n                \"header\": \"\"\n            }\n        },\n        \"goods\": {\n            \"count\": 2,\n            \"list\": [\n                {\n                    \"id\": \"1\",\n                    \"created_at\": \"2018-01-18 15:56:27\",\n                    \"updated_at\": \"2018-01-18 15:56:27\",\n                    \"deleted\": \"0\",\n                    \"status\": \"0\",\n                    \"enable\": \"1\",\n                    \"sort\": \"0\",\n                    \"name\": \"测试商品\",\n                    \"stock\": \"1000\",\n                    \"original_price\": \"198.00\",\n                    \"sale_price\": \"198.00\",\n                    \"freight_fee\": \"6.00\",\n                    \"send_mode\": \"1\",\n                    \"use_point_rate\": \"1.00\",\n                    \"e_invoice\": \"1\",\n                    \"city_partner_rate\": \"2.00\",\n                    \"two_level_rate\": \"3.00\",\n                    \"goods_detail\": \"[\\\"/uploads/2018/01/18/2ea459123697d30c36a707e155dc23da.png\\\"]\",\n                    \"seller_uid\": \"1\",\n                    \"goods_image\": \"[\\\"/uploads/2018/01/18/3e14d5652673b8a225d4772f13441ab1.jpeg\\\"]\",\n                    \"goods_attr\": \"{\\\"6\\\":[\\\"XL\\\",\\\"L\\\"],\\\"8\\\":[\\\"白色\\\",\\\"绿色\\\"]}\",\n                    \"goods_ticket\": \"[{\\\"full_amount\\\":\\\"100\\\",\\\"free_amount\\\":\\\"6\\\"}]\",\n                    \"default_image\": \"/uploads/2018/01/18/3e14d5652673b8a225d4772f13441ab1.jpeg\",\n                    \"goods_class_id\": \"0\"\n                }\n            ]\n        }\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Goods.php",
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
    "url": "/api/goods_class",
    "title": "商品分类-列表",
    "version": "1.0.0",
    "name": "goods_class",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/goods_class"
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
            "description": "<p>商品分类唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>商品分类名称</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Goods_class.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/goods/evaluate",
    "title": "商品-更多评论",
    "version": "1.0.0",
    "name": "goods_evaluate",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/goods/evaluate"
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
            "type": "Number",
            "optional": false,
            "field": "goods_id",
            "description": "<p>商品ID</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Goods.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/goods/init",
    "title": "商品-发布初始化",
    "version": "1.0.0",
    "name": "goods_init",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/goods/init"
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
            "type": "String",
            "optional": false,
            "field": "data.send_mode",
            "description": "<p>发货模式</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.goods_attr",
            "description": "<p>商品属性</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"data\": {\n       \"send_mode\": [\n           \"卖家发货\",\n           \"上门自提\",\n           \"不用发货\"\n       ],\n       \"goods_attr\": [\n           {\n               \"id\": \"9\",\n               \"name\": \"尺寸\"\n           },\n           {\n               \"id\": \"8\",\n               \"name\": \"颜色\"\n           },\n           {\n               \"id\": \"7\",\n               \"name\": \"容量\"\n           },\n           {\n               \"id\": \"6\",\n               \"name\": \"尺寸\"\n           },\n           {\n               \"id\": \"5\",\n               \"name\": \"型号\"\n           },\n           {\n               \"id\": \"4\",\n               \"name\": \"规格\"\n           }\n       ]\n   },\n   \"status\": 0,\n   \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Goods.php",
    "groupTitle": "api"
  },
  {
    "type": "post",
    "url": "/api/goods/save",
    "title": "商品-编辑 OR 新增",
    "version": "1.0.0",
    "name": "goods_save",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/goods/save"
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
            "description": "<p>产品名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "stock",
            "description": "<p>数量</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sale_price",
            "description": "<p>销售价</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "freight_fee",
            "description": "<p>邮费</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "send_mode",
            "description": "<p>发货模式</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "goods_ticket",
            "description": "<p>优惠券 json [{full_amount: 500, free_amount: 50}, {full_amount: 1000, free_amount: 150}]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "use_point_rate",
            "description": "<p>最大积分使用量</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "e_invoice",
            "description": "<p>是否支持发票</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "city_partner_rate",
            "description": "<p>城市合伙人分销比例</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "two_level_rate",
            "description": "<p>二级分销比例</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "goods_image",
            "description": "<p>商品主图 json [&quot;/uploads/2018/01/17/09c4a26e54ab231b734870b510771265.png&quot;]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "goods_attr",
            "description": "<p>商品属性 json {&quot;9&quot;:[&quot;M&quot;,&quot;X&quot;,&quot;S&quot;,&quot;L&quot;],&quot;8&quot;:[&quot;红色&quot;,&quot;蓝色&quot;]}</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "goods_detail",
            "description": "<p>商品详情 json [&quot;/uploads/2018/01/17/09c4a26e54ab231b734870b510771265.png&quot;]</p>"
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
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序 降序排列</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "goods_class_id",
            "description": "<p>商品分类ID</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Goods.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/goods/view",
    "title": "商品-详情",
    "version": "1.0.0",
    "name": "goods_view",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/goods/view"
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
            "type": "Number",
            "optional": false,
            "field": "goods_id",
            "description": "<p>商品ID</p>"
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
            "field": "data.goods_info",
            "description": "<p>商品详情</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.goods_attr",
            "description": "<p>商品属性</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.evaluate",
            "description": "<p>评论</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.seller",
            "description": "<p>商家信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.goods",
            "description": "<p>商家其他商品</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.favorite",
            "description": "<p>商品收藏 1已收藏 0未收藏</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Goods.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/grade",
    "title": "等级经验-我的等级",
    "version": "1.0.0",
    "name": "grade",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/grade"
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
            "type": "Object",
            "optional": false,
            "field": "data.grade",
            "description": "<p>我的等级</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.grade.before_grade_name",
            "description": "<p>前一级等级</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.grade.grade_name",
            "description": "<p>当前等级</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.grade.after_grade_name",
            "description": "<p>下一级等级</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.grade.diff",
            "description": "<p>升级差值</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.grade.exp",
            "description": "<p>当前经验值</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.rule",
            "description": "<p>等级说明</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"grade\": {\n            \"before_grade_name\": \"\",\n            \"grade_name\": \"\",\n            \"after_grade_name\": \"钻石\",\n            \"diff\": 10000,\n            \"exp\": \"0\"\n        },\n        \"rule\": \"\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Grade.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/knowledge/album",
    "title": "知识-专辑(知识、娱乐)",
    "version": "1.0.0",
    "name": "knowledge_album",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/knowledge/album"
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
            "type": "Number",
            "optional": false,
            "field": "album_class_id",
            "description": "<p>专辑分类ID</p>"
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
            "type": "Number",
            "optional": false,
            "field": "data.count",
            "description": "<p>总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.list",
            "description": "<p>专辑列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.list.id",
            "description": "<p>专辑唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.cover_image",
            "description": "<p>专家背景</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.title",
            "description": "<p>专辑标题</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.list.price",
            "description": "<p>门票价</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.list.audio_num",
            "description": "<p>音频集</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.list.play_times",
            "description": "<p>播放次数</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"count\": 1,\n        \"list\": [\n            {\n                \"id\": \"7\",\n                \"cover_image\": \"/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png\",\n                \"title\": \"你的出生地址\",\n                \"price\": \"10000.00\",\n                \"audio_num\": \"1\",\n                \"play_times\": \"0\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Knowledge.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/knowledge/collection",
    "title": "知识-关注(主播)",
    "version": "1.0.0",
    "name": "knowledge_collection",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/knowledge/collection"
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
            "type": "Number",
            "optional": false,
            "field": "data.total",
            "description": "<p>总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.list",
            "description": "<p>关注列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.list.id",
            "description": "<p>用户唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.header",
            "description": "<p>头像</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.nickname",
            "description": "<p>昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.summary",
            "description": "<p>简介</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.list.v",
            "description": "<p>v认证 0否 1是</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.list.exp",
            "description": "<p>经验值</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.list.fans",
            "description": "<p>粉丝数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.list.music",
            "description": "<p>音乐数</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"total\": 4,\n        \"list\": [\n            {\n                \"id\": \"3\",\n                \"header\": \"\",\n                \"nickname\": \"匿名\",\n                \"summary\": \"\",\n                \"v\": \"0\",\n                \"exp\": \"0\",\n                \"fans\": \"1\",\n                \"music\": 0\n            },\n            {\n                \"id\": \"2\",\n                \"header\": \"\",\n                \"nickname\": \"匿名\",\n                \"summary\": \"\",\n                \"v\": \"0\",\n                \"exp\": \"0\",\n                \"fans\": \"2\",\n                \"music\": 0\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Knowledge.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/knowledge/live",
    "title": "知识-热门",
    "version": "1.0.0",
    "name": "knowledge_live",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/knowledge/live"
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
            "field": "data.ad",
            "description": "<p>轮播广告</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.anchor",
            "description": "<p>热门主播</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.live",
            "description": "<p>直播/预告</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.live.live_status",
            "description": "<p>状态 0预告 1直播中 2点播</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"ad\": [\n            {\n                \"title\": \"\",\n                \"link\": \"\",\n                \"image\": \"/uploads/2018/02/28/35e9694b2fc8a48148d4ac415fa8a30d.jpg\"\n            }\n        ],\n        \"anchor\": [\n            {\n               \"id\": \"1\",\n                \"nickname\": \"aicode\",\n                \"header\": \"\",\n                \"v\": \"0\"\n            }\n        ],\n        \"online\": [\n            {\n                \"room_id\": \"4\",\n                \"title\": \"你的出生地址\",\n                \"cover_image\": \"/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png\",\n       \"play_url\": \"{\\\"rtmp\\\":\\\"rtmp:\\\\/\\\\/6077.liveplay.myqcloud.com\\\\/live\\\\/6077_zhumaidan-1-2\\\",\\\"flv\\\":\\\"http:\\\\/\\\\/6077.liveplay.myqcloud.com\\\\/live\\\\/6077_zhumaidan-1-2.flv\\\",\\\"m3u8\\\":\\\"http:\\\\/\\\\/6077.liveplay.myqcloud.com\\\\/live\\\\/6077_zhumaidan-1-2.m3u8\\\"}\",\n                \"live_tag_id\": \"0\",\n                \"anchor_uid\": \"1\",\n                \"views\": \"0\",\n                \"nickname\": \"aicode\",\n                \"v\": \"0\",\n                \"price\": \"0.00\"\n                \"live_status\": \"0\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Knowledge.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/user/live_album/view",
    "title": "我的专辑-查看",
    "version": "1.0.0",
    "name": "live_album_view",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/user/live_album/view"
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
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>专辑ID</p>"
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
          "content": "{\n    \"data\": {\n        \"id\": \"7\",\n        \"cover_image\": \"/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png\",\n        \"title\": \"你的出生地址\",\n        \"album_class\": \"3\",\n        \"album_tag\": \",配音,铃声,\",\n        \"price\": \"10000.00\",\n        \"city_partner_rate\": \"0.00\",\n        \"two_level_rate\": \"0.00\",\n        \"public\": \"1\",\n        \"album_class_name\": \"知识\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Live_album.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/user/live_audio/view",
    "title": "我的音频-查看",
    "version": "1.0.0",
    "name": "live_audio_view",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/user/live_audio/view"
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
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>音频ID</p>"
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
          "content": "{\n    \"data\": {\n        \"id\": \"3\",\n        \"cover_image\": \"\",\n        \"title\": \"\",\n        \"album_id\": \"0\",\n        \"price\": \"0.00\",\n        \"city_partner_rate\": \"0.00\",\n        \"two_level_rate\": \"0.00\",\n        \"album_title\": \"\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Live_audio.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/live_class",
    "title": "直播类-列表",
    "version": "1.0.0",
    "name": "live_class",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/live_class"
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
            "description": "<p>直播类唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>直播类名称</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Live_class.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/live_gift",
    "title": "直播礼物-列表",
    "version": "1.0.0",
    "name": "live_gift",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/live_gift"
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
            "description": "<p>直播礼物唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.title",
            "description": "<p>直播礼物名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.img",
            "description": "<p>直播礼物图</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.amount",
            "description": "<p>兑换数量</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.exchange_type",
            "description": "<p>兑换类型 1金币 2积分</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": [\n        {\n            \"id\": \"1\",\n            \"title\": \"棒棒糖\",\n            \"img\": \"/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png\",\n            \"amount\": \"10000\",\n            \"exchange_type\": \"1\"\n        }\n    ],\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Live_gift.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/live_gift/send",
    "title": "直播礼物-送礼",
    "version": "1.0.0",
    "name": "live_gift_send",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/live_gift/send"
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
            "type": "Number",
            "optional": false,
            "field": "to_user_id",
            "description": "<p>收礼用户ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "gift_id",
            "description": "<p>礼物唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "num",
            "description": "<p>礼物数量</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "room_id",
            "description": "<p>直播间ID</p>"
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
            "description": "<p>直播礼物唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.title",
            "description": "<p>直播礼物名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.img",
            "description": "<p>直播礼物图</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.amount",
            "description": "<p>兑换数量</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.exchange_type",
            "description": "<p>兑换类型 1金币 2积分</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": [\n        {\n            \"id\": \"1\",\n            \"title\": \"棒棒糖\",\n            \"img\": \"/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png\",\n            \"amount\": \"10000\",\n            \"exchange_type\": \"1\"\n        }\n    ],\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Live_gift.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/live_tag",
    "title": "直播标签-列表",
    "version": "1.0.0",
    "name": "live_tag",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/live_tag"
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
            "description": "<p>直播标签唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>直播标签名称</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Live_tag.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/mailbox",
    "title": "站内信-列表",
    "version": "1.0.0",
    "name": "mailbox",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/mailbox"
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
            "type": "String",
            "optional": false,
            "field": "data.read_ids",
            "description": "<p>阅读记录ID集 ,1,2,</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.count",
            "description": "<p>文章数量</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.list",
            "description": "<p>接口数据集</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.id",
            "description": "<p>唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.summary",
            "description": "<p>标摘要题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.updated_at",
            "description": "<p>发布时间</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"count\": 2,\n        \"list\": [\n            {\n                \"id\": \"16\",\n                \"title\": \"测试\",\n                \"summary\": \"\",\n                \"updated_at\": \"2018-01-26 17:47:49\"\n            },\n            {\n                \"id\": \"15\",\n                \"title\": \"这是一条站内信\",\n                \"summary\": \"\",\n                \"updated_at\": \"2018-01-23 19:31:19\"\n            }\n        ],\n        \"read_ids\": \",15,14,5,1,11,16,\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Mailbox.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/mailbox/reddot",
    "title": "站内信-红点",
    "version": "1.0.0",
    "name": "mailbox_reddot",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/mailbox/reddot"
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
            "type": "String",
            "optional": false,
            "field": "data.reddot",
            "description": "<p>0无 1有</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"reddot\": 0\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Mailbox.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/mailbox/view",
    "title": "站内信-查看",
    "version": "1.0.0",
    "name": "mailbox_view",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/mailbox/view"
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
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>站内信ID</p>"
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
            "description": "<p>消息唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.title",
            "description": "<p>消息标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.content",
            "description": "<p>消息详情</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.summary",
            "description": "<p>标摘要题</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"id\": \"16\",\n        \"updated_at\": \"2018-01-26 17:47:49\",\n        \"title\": \"测试\",\n        \"content\": \"<p>这是一条站内信</p>\\n\",\n        \"summary\": \"\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Mailbox.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/normal/images",
    "title": "通用-广告图",
    "version": "1.0.0",
    "name": "normal_images",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/normal/images"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job",
            "description": "<p>应用区间{guid: '引导页', startup: '启动页'}</p>"
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
            "type": "Objet[]",
            "optional": false,
            "field": "data",
            "description": "<p>接口数据集</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.link",
            "description": "<p>链接</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.image",
            "description": "<p>图片</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"data\": [\n       {\n           \"title\": \"22\",\n           \"link\": \"\",\n           \"image\": \"\"\n       }\n   ],\n   \"status\": 0,\n   \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Normal.php",
    "groupTitle": "api"
  },
  {
    "type": "post",
    "url": "/api/user/order_payment/payment",
    "title": "订单付款页-提交",
    "version": "1.0.0",
    "name": "order_payment_payment",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/user/order_payment/payment"
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
            "type": "Number",
            "optional": false,
            "field": "payment_type",
            "description": "<p>支付类型 balance：余额 wechat：微信 alipay：支付宝</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "trade_type",
            "description": "<p>交易类型 pay_sn：下单支付 order_sn：订单列表支付</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "trade_sn",
            "description": "<p>交易号</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Order_payment.php",
    "groupTitle": "api"
  },
  {
    "type": "post",
    "url": "/api/user/recharge/payment",
    "title": "充值-提交",
    "version": "1.0.0",
    "name": "recharge_payment",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/user/recharge/payment"
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
            "type": "Number",
            "optional": false,
            "field": "payment_id",
            "description": "<p>充值方式 0微信 1支付宝</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>充值金额</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Recharge.php",
    "groupTitle": "api"
  },
  {
    "type": "post",
    "url": "/api/room/in",
    "title": "直播-进房间",
    "version": "1.0.0",
    "name": "room_in",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/room/in"
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
            "type": "Number",
            "optional": false,
            "field": "room_id",
            "description": "<p>房间号</p>"
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
            "type": "Number",
            "optional": false,
            "field": "data.chat_room_id",
            "description": "<p>聊天室ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.views",
            "description": "<p>主播热度</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"chat_room_id\": 2,\n        \"views\": 2,\n        \"income_gold\": 10000,\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Room.php",
    "groupTitle": "api"
  },
  {
    "type": "post",
    "url": "/api/room/out",
    "title": "直播-退出房间",
    "version": "1.0.0",
    "name": "room_out",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/room/out"
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
            "type": "Number",
            "optional": false,
            "field": "room_id",
            "description": "<p>房间号</p>"
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
          "content": "{\n   \"data\": [],\n   \"status\": 0,\n   \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Room.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/room/viewer",
    "title": "直播-观众",
    "version": "1.0.0",
    "name": "room_viewer",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/room/viewer"
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
            "type": "Number",
            "optional": false,
            "field": "room_id",
            "description": "<p>房间号</p>"
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
            "type": "String",
            "optional": false,
            "field": "data.vip",
            "description": "<p>贵族信息 id=0表示无贵族</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": [\n        {\n            \"id\": \"1\",\n            \"header\": \"/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png\",\n            \"exp\": \"0\",\n            \"vip\": {\n                \"name\": \"\",\n                \"icon\": \"\",\n                \"id\": 0\n            }\n        },\n        {\n            \"id\": \"2\",\n            \"header\": \"\",\n            \"exp\": \"0\",\n            \"vip\": {\n                \"name\": \"\",\n                \"icon\": \"\",\n                \"id\": 0\n            }\n        }\n    ],\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Room.php",
    "groupTitle": "api"
  },
  {
    "type": "post",
    "url": "/api/rule",
    "title": "规则说明",
    "version": "1.0.0",
    "name": "rule",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/rule"
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
            "type": "String",
            "optional": false,
            "field": "rule",
            "description": "<p>规则项 point: 积分 grade: 等级</p>"
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
          "content": "{\n    \"data\": {\n        \"rule_point\": \"\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Rule.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/search",
    "title": "搜索",
    "version": "1.0.0",
    "name": "search",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/search"
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
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>搜索词</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "from",
            "description": "<p>来源 知识：knowledge 商城：shop</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tab",
            "description": "<p>显示卡项 专辑：album 主播：anchor 直播：live 音频：audio</p>"
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
          "content": "{\n    \"data\": {\n        \"count\": 1,\n        \"list\": [\n            {\n                \"room_id\": \"52\",\n                \"title\": \"你的出生地址\",\n                \"cover_image\": \"/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png\",\n                \"play_url\": {\n                    \"rtmp\": \"rtmp://6077.liveplay.myqcloud.com/live/6077_zhumaidan-1-52\",\n                    \"flv\": \"http://6077.liveplay.myqcloud.com/live/6077_zhumaidan-1-52.flv\",\n                    \"m3u8\": \"http://6077.liveplay.myqcloud.com/live/6077_zhumaidan-1-52.m3u8\"\n                },\n                \"live_tag_id\": \"0\",\n                \"anchor_uid\": \"1\",\n                \"views\": \"0\",\n                \"price\": \"10000.00\",\n                \"tag_name\": \"\",\n                \"live_status\": 1,\n                \"nickname\": \"aicode\",\n                \"v\": \"0\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Search.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/search_words",
    "title": "热搜词-列表",
    "version": "1.0.0",
    "name": "search_words",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/search_words"
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
            "description": "<p>热搜词唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.keyword",
            "description": "<p>热搜词</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.keyword_alias",
            "description": "<p>显示词词</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": [\n        {\n            \"id\": \"1\",\n            \"created_at\": \"2018-01-23 11:16:47\",\n            \"updated_at\": \"2018-01-23 11:16:47\",\n            \"deleted\": \"0\",\n            \"enable\": \"1\",\n            \"sort\": \"0\",\n            \"keyword\": \"童装\",\n            \"keyword_alias\": \"六一儿童\"\n        }\n    ],\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Search_words.php",
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
    "url": "/api/seller",
    "title": "店铺-主页",
    "version": "1.0.0",
    "name": "seller",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/seller"
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
            "type": "Number",
            "optional": false,
            "field": "seller_uid",
            "description": "<p>店铺唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>商店：goods 简介：info 专辑：album 直播：live</p>"
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
          "content": "{\n    \"data\": \"\",\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Seller.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/seller/album",
    "title": "店铺-更多专题",
    "version": "1.0.0",
    "name": "seller_album",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/seller/album"
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
            "type": "Number",
            "optional": false,
            "field": "seller_uid",
            "description": "<p>店铺唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>搜索关键词</p>"
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
            "field": "data.album",
            "description": "<p>专题</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"album\": {\n            \"count\": 1,\n            \"list\": [\n                {\n                    \"id\": \"7\",\n                    \"cover_image\": \"/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png\",\n                    \"title\": \"你的出生地址\",\n                    \"price\": \"10000.00\",\n                    \"audio_num\": \"1\",\n                    \"play_times\": \"0\"\n                }\n            ]\n        }\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Seller.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/seller/audio",
    "title": "店铺-更多音频",
    "version": "1.0.0",
    "name": "seller_audio",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/seller/audio"
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
            "type": "Number",
            "optional": false,
            "field": "seller_uid",
            "description": "<p>店铺唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>搜索关键词</p>"
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
            "field": "data.audio",
            "description": "<p>音频</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"album\": {\n            \"count\": 1,\n            \"list\": [\n                {\n                    \"id\": \"3\",\n                    \"cover_image\": \"/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png\",\n                    \"title\": \"你的出生地址\",\n                    \"price\": \"10000.00\",\n                    \"updated_at\": \"2018-03-01 18:38:43\",\n                    \"duration\": \"404\",\n                    \"play_times\": \"0\"\n                }\n            ]\n        }\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Seller.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/seller/goods",
    "title": "店铺-更多商品",
    "version": "1.0.0",
    "name": "seller_goods",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/seller/goods"
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
            "type": "Number",
            "optional": false,
            "field": "seller_uid",
            "description": "<p>店铺唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>搜索关键词</p>"
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
            "field": "data.goods",
            "description": "<p>推荐商品</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Seller.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/seller/live",
    "title": "店铺-更多预告",
    "version": "1.0.0",
    "name": "seller_live",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/seller/live"
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
            "type": "Number",
            "optional": false,
            "field": "seller_uid",
            "description": "<p>店铺唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>搜索关键词</p>"
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
            "field": "data.live",
            "description": "<p>直播预告</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"live\": {\n            \"count\": 15,\n            \"list\": [\n                {\n                    \"room_id\": \"48\",\n                    \"title\": \"安卓测试\",\n                    \"cover_image\": \"/uploads/2018/01/30/bb61ca8b2be1d1aee82b0ae8c6ac1cce.png\",\n                    \"anchor_uid\": \"1\",\n                    \"views\": \"3\",\n                    \"price\": \"0.00\",\n                    \"start_at\": \"4294967295\"\n                }\n            ]\n        }\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Seller.php",
    "groupTitle": "api"
  },
  {
    "type": "post",
    "url": "/api/share/register",
    "title": "分享-领取积分登记",
    "version": "1.0.0",
    "name": "share_register",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/share/register"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": [],\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Share.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/shop",
    "title": "商城-首页",
    "version": "1.0.0",
    "name": "shop",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/shop"
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
            "type": "Number",
            "optional": false,
            "field": "goods_class_id",
            "description": "<p>商城分类ID</p>"
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
            "field": "data.ad",
            "description": "<p>推荐广告</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.goods",
            "description": "<p>推荐商品</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"data\": {\n       \"ad\": [],\n       \"goods\": []\n   },\n   \"status\": 0,\n   \"message\": \"成功\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n   \"data\": \"\",\n   \"status\": 1,\n   \"message\": \"商城分类ID错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Shop.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/shop/goods",
    "title": "商城-更多商品",
    "version": "1.0.0",
    "name": "shop_goods",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/shop/goods"
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
            "type": "Number",
            "optional": false,
            "field": "goods_class_id",
            "description": "<p>商城分类ID</p>"
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
            "description": "<p>接口数据集 推荐商品</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.goods",
            "description": "<p>推荐商品</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Shop.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/shop/pretty",
    "title": "商城-靓号其他",
    "version": "1.0.0",
    "name": "shop_pretty",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/shop/pretty"
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
            "type": "Number",
            "optional": false,
            "field": "pretty_count",
            "description": "<p>靓号位数 0表示默认靓号</p>"
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
            "field": "data.pretty",
            "description": "<p>靓号列表</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"pretty\": [\n            {\n                \"id\": \"1\",\n                \"pretty_id\": \"10000\",\n                \"price\": \"5000.00\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Shop.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/shop/pretty_index",
    "title": "商城-靓号首页",
    "version": "1.0.0",
    "name": "shop_pretty_index",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/shop/pretty_index"
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
            "type": "Number",
            "optional": false,
            "field": "pretty_count",
            "description": "<p>靓号位数 0表示默认靓号</p>"
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
            "field": "data.ad",
            "description": "<p>广告集</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.pretty",
            "description": "<p>靓号列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.pretty_count",
            "description": "<p>靓号位数</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"ad\": [\n            {\n                \"title\": \"22\",\n                \"link\": \"\",\n                \"image\": \"\"\n            },\n            {\n                \"title\": \"1\",\n                \"link\": \"\",\n                \"image\": \"\"\n            }\n        ],\n        \"pretty\": [\n            {\n                \"id\": \"1\",\n                \"pretty_id\": \"10000\",\n                \"price\": \"5000.00\"\n            }\n        ],\n        \"pretty_count\": [\n            {\n                \"pretty_count\": \"3\"\n            },\n            {\n                \"pretty_count\": \"4\"\n            },\n            {\n                \"pretty_count\": \"5\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Shop.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/signature/qcloud",
    "title": "签名-腾讯云(视频)",
    "version": "1.0.0",
    "name": "signature_qcloud",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/signature/qcloud"
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
            "type": "String",
            "optional": false,
            "field": "data.qcloud",
            "description": "<p>融云qcloud</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"signature\": \"NyZXRJZD0mY3VycmVudFRpbWVTdGFtcD0xNTIxNTk2Mzk2JmV4cGlyZVRpbWU9MTUyMTY4Mjc5NiZyYW5kb209MTU0OQ==\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Signature.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/users_grade",
    "title": "经验值明细",
    "version": "1.0.0",
    "name": "users_grade",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/users_grade"
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
            "type": "Object",
            "optional": false,
            "field": "data.user",
            "description": "<p>会员信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.grade.count",
            "description": "<p>经验值变动总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.grade.list",
            "description": "<p>经验值变动记录</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": \"\",\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Users_grade.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/users_points",
    "title": "积分明细",
    "version": "1.0.0",
    "name": "users_points",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/users_points"
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
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>类型 income：收入 used：使用 all：全部</p>"
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
            "type": "Number",
            "optional": false,
            "field": "data.count",
            "description": "<p>总记录数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.list",
            "description": "<p>列表</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.id",
            "description": "<p>积分明细ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.updated_at",
            "description": "<p>更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.value",
            "description": "<p>变更值</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.remark",
            "description": "<p>备注描述</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.rule_name_text",
            "description": "<p>变更类型</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"count\": 5,\n        \"list\": [\n            {\n                \"id\": \"5\",\n                \"updated_at\": \"2018-03-14 20:06:18\",\n                \"user_id\": \"1\",\n                \"value\": \"-20\",\n                \"rule_name\": \"goods_exchange\",\n                \"remark\": \"商品抵扣现金\",\n                \"rule_name_text\": \"消费抵扣\"\n            },\n            {\n                \"id\": \"4\",\n                \"updated_at\": \"2018-03-14 19:59:13\",\n                \"user_id\": \"1\",\n                \"value\": \"10\",\n                \"rule_name\": \"points_pay\",\n                \"remark\": \"商品消费立返\",\n                \"rule_name_text\": \"消费立返\"\n            },\n            {\n                \"id\": \"3\",\n                \"updated_at\": \"2018-03-14 19:49:27\",\n                \"user_id\": \"1\",\n                \"value\": \"50\",\n                \"rule_name\": \"points_evaluate\",\n                \"remark\": \"商品订单评论\",\n                \"rule_name_text\": \"订单评论\"\n            },\n            {\n                \"id\": \"2\",\n                \"updated_at\": \"2018-03-14 15:46:05\",\n                \"user_id\": \"1\",\n                \"value\": \"20\",\n                \"rule_name\": \"points_login\",\n                \"remark\": \"每天首次登录\",\n                \"rule_name_text\": \"会员登陆\"\n            },\n            {\n                \"id\": \"1\",\n                \"updated_at\": \"2018-03-14 13:01:09\",\n                \"user_id\": \"1\",\n                \"value\": \"100\",\n                \"rule_name\": \"points_reg\",\n                \"remark\": \"新用户首次注册\",\n                \"rule_name_text\": \"会员注册\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Users_points.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/vip",
    "title": "贵族-列表",
    "version": "1.0.0",
    "name": "vip",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/vip"
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
            "description": "<p>贵族唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>贵族名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.first_fee",
            "description": "<p>首开费用</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.first_gold",
            "description": "<p>首开金币</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.renew_fee",
            "description": "<p>续费费用</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.renew_gold",
            "description": "<p>续费金币</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.days",
            "description": "<p>有效期天数</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.unit",
            "description": "<p>有效期单位：日/月/季/年</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": [\n        {\n            \"id\": \"1\",\n            \"name\": \"男爵\",\n            \"first_fee\": \"100.00\",\n            \"first_gold\": \"10000\",\n            \"renew_fee\": \"80.00\",\n            \"renew_gold\": \"12000\",\n            \"icon\": \"\",\n            \"days\": \"30\",\n            \"unit\": \"月\",\n        }\n    ],\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Vip.php",
    "groupTitle": "api"
  },
  {
    "type": "post",
    "url": "/api/vip/payment",
    "title": "贵族-支付",
    "version": "1.0.0",
    "name": "vip_payment",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/vip/payment"
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
            "type": "String",
            "optional": false,
            "field": "payment_type",
            "description": "<p>支付类型 balance：余额 wechat：微信 alipay：支付宝</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "vip_id",
            "description": "<p>贵族ID</p>"
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
          "content": "{\n\t   \"data\": \"\",\n    \"status\": -1,\n    \"message\": \"签名校验错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Vip.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/vip/view",
    "title": "贵族-下单",
    "version": "1.0.0",
    "name": "vip_view",
    "group": "api",
    "sampleRequest": [
      {
        "url": "/api/vip/view"
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
            "type": "Number",
            "optional": false,
            "field": "vip_id",
            "description": "<p>贵族ID</p>"
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
            "description": "<p>贵族唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>贵族名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.first_fee",
            "description": "<p>首开费用</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.first_gold",
            "description": "<p>首开金币</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.renew_fee",
            "description": "<p>续费费用</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.renew_gold",
            "description": "<p>续费金币</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.days",
            "description": "<p>有效期天数</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.unit",
            "description": "<p>有效期单位：日/月/季/年</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.balance",
            "description": "<p>账号余额</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.amount",
            "description": "<p>支付金额</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"id\": \"1\",\n        \"name\": \"男爵\",\n        \"enable\": \"1\",\n        \"first_fee\": \"100.00\",\n        \"first_gold\": \"10000\",\n        \"renew_fee\": \"80.00\",\n        \"renew_gold\": \"12000\",\n        \"icon\": \"\",\n        \"days\": \"30\",\n        \"unit\": \"月\",\n        \"balance\": \"9800.10\",\n        \"amount\": \"100.00\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Vip.php",
    "groupTitle": "api"
  },
  {
    "type": "get",
    "url": "/api/user/album_audio_comment",
    "title": "音频-所有评论",
    "version": "1.0.0",
    "name": "album_audio_comment",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/album_audio_comment"
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
            "type": "String",
            "optional": false,
            "field": "audio_id",
            "description": "<p>音频ID</p>"
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
          "content": "{\n    \"data\": {\n        \"count\": 2,\n        \"list\": [\n            {\n                \"id\": \"4\",\n                \"user_id\": \"1\",\n                \"comment\": \"主播能加个微信或留个电话吗\",\n                \"created_at\": \"2018-04-02 13:12:48\",\n                \"header\": \"/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png\",\n                \"nickname\": \"aicode\",\n                \"likes\": 0,\n                \"has_likes\": 0,\n                \"reply\": {\n                    \"count\": 0,\n                    \"list\": []\n                }\n            },\n            {\n                \"id\": \"1\",\n                \"user_id\": \"1\",\n                \"comment\": \"双击666\",\n                \"created_at\": \"2018-04-02 11:03:41\",\n                \"header\": \"/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png\",\n                \"nickname\": \"aicode\",\n                \"likes\": 0,\n                \"has_likes\": 0,\n                \"reply\": {\n                    \"count\": 2,\n                    \"list\": [\n                        {\n                            \"user_id\": \"1\",\n                            \"comment\": \"送飞机、航母\",\n                            \"header\": \"/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png\",\n                            \"nickname\": \"aicode\"\n                        },\n                        {\n                            \"user_id\": \"1\",\n                            \"comment\": \"双击666\",\n                            \"header\": \"/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png\",\n                            \"nickname\": \"aicode\"\n                        }\n                    ]\n                }\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Album_audio_comment.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/album_audio_comment/add",
    "title": "音频-发布评论",
    "version": "1.0.0",
    "name": "album_audio_comment_add",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/album_audio_comment/add"
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
            "type": "String",
            "optional": false,
            "field": "audio_id",
            "description": "<p>音频ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>评论内容</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pid",
            "description": "<p>父级ID 默认0，大于0表示回复该评论</p>"
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
          "content": "{\n    \"data\": {\n\t   },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Album_audio_comment.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/album_audio_comment/barrage",
    "title": "音频-弹幕",
    "version": "1.0.0",
    "name": "album_audio_comment_barrage",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/album_audio_comment/barrage"
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
            "type": "String",
            "optional": false,
            "field": "audio_id",
            "description": "<p>音频ID</p>"
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
          "content": "{\n    \"data\": {\n        \"count\": 4,\n        \"list\": [\n            {\n                \"id\": \"4\",\n                \"user_id\": \"1\",\n                \"comment\": \"主播能加个微信或留个电话吗\",\n                \"header\": \"/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png\",\n                \"nickname\": \"aicode\"\n            },\n            {\n                \"id\": \"3\",\n                \"user_id\": \"1\",\n                \"comment\": \"送飞机、航母\",\n                \"header\": \"/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png\",\n                \"nickname\": \"aicode\"\n            },\n            {\n                \"id\": \"2\",\n                \"user_id\": \"1\",\n                \"comment\": \"双击666\",\n                \"header\": \"/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png\",\n                \"nickname\": \"aicode\"\n            },\n            {\n                \"id\": \"1\",\n                \"user_id\": \"1\",\n                \"comment\": \"双击666\",\n                \"header\": \"/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png\",\n                \"nickname\": \"aicode\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Album_audio_comment.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/album_audio_comment/likes",
    "title": "音频-评论点赞",
    "version": "1.0.0",
    "name": "album_audio_comment_likes",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/album_audio_comment/likes"
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
            "type": "String",
            "optional": false,
            "field": "cid",
            "description": "<p>评论ID 点赞/取消自动判断</p>"
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
          "content": "{\n    \"data\": {\n\t   },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Album_audio_comment.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/album_audio_comment/view",
    "title": "音频-评论详情",
    "version": "1.0.0",
    "name": "album_audio_comment_view",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/album_audio_comment/view"
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
            "type": "String",
            "optional": false,
            "field": "cid",
            "description": "<p>评论ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "audio_id",
            "description": "<p>音频ID</p>"
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
          "content": "{\n    \"data\": {\n        \"id\": \"1\",\n        \"user_id\": \"1\",\n        \"comment\": \"双击666\",\n        \"created_at\": \"2018-04-02 11:03:41\",\n        \"header\": \"/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png\",\n        \"nickname\": \"aicode\",\n        \"likes\": 0,\n        \"has_likes\": 0,\n        \"reply\": {\n            \"count\": 2,\n            \"list\": [\n                {\n                    \"id\": \"3\",\n                    \"user_id\": \"1\",\n                    \"comment\": \"送飞机、航母\",\n                    \"created_at\": \"2018-04-02 13:11:39\",\n                    \"header\": \"/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png\",\n                    \"nickname\": \"aicode\"\n                },\n                {\n                    \"id\": \"2\",\n                    \"user_id\": \"1\",\n                    \"comment\": \"双击666\",\n                    \"created_at\": \"2018-04-02 12:51:39\",\n                    \"header\": \"/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png\",\n                    \"nickname\": \"aicode\"\n                }\n            ]\n        }\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Album_audio_comment.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/album_tag/add",
    "title": "专辑标签-自定义",
    "version": "1.0.0",
    "name": "album_tag_add",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/album_tag/add"
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
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>标签名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pid",
            "description": "<p>父级ID</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Album_tag.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/album_tag/del",
    "title": "专辑标签-自定义删除",
    "version": "1.0.0",
    "name": "album_tag_del",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/album_tag/del"
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
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>自定义标签ID</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Album_tag.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/anchor",
    "title": "讲师认证-初始页",
    "version": "1.0.0",
    "name": "anchor",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/anchor"
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
            "field": "data.class",
            "description": "<p>主播类型</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.anchor",
            "description": "<p>主播信息 空表示未提交过</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.certificate",
            "description": "<p>证件</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n\t\t\t\"class\": [],\n\t\t\t\"anchor\": {},\n\t\t\t\"certificate\": {}\n\t   },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Anchor.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/anchor/save",
    "title": "讲师认证-编辑 OR 新增",
    "version": "1.0.0",
    "name": "anchor_save",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/anchor/save"
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
            "type": "Number",
            "optional": false,
            "field": "mobi",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nickname",
            "description": "<p>昵称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "realname",
            "description": "<p>真实姓名</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "certificate_type",
            "description": "<p>证件类型</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "certificate_no",
            "description": "<p>证件号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "certificate_photo",
            "description": "<p>证件照</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "class_id",
            "description": "<p>主播类型</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "summary",
            "description": "<p>简介</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "other",
            "description": "<p>其他说明</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "anchor_photo",
            "description": "<p>主播照 json</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "anchor_video",
            "description": "<p>主播视频 json</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job",
            "description": "<p>职业</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "province_id",
            "description": "<p>省ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "city_id",
            "description": "<p>市ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "area_id",
            "description": "<p>区ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>详细地址</p>"
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
          "content": "{\n    \"data\": {\n\t\t\t\"points_reg\": \"会员注册\",\n\t\t\t\"points_login\": \"会员登录\"\n\t   },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Anchor.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/bag",
    "title": "红包-详情",
    "version": "1.0.0",
    "name": "bag",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/bag"
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
            "type": "String",
            "optional": false,
            "field": "bag_id",
            "description": "<p>红包ID</p>"
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
            "type": "String",
            "optional": false,
            "field": "data.amount",
            "description": "<p>红包额度</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.num",
            "description": "<p>红包数量</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.header",
            "description": "<p>发红包者头像</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.nickname",
            "description": "<p>发红包者昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.list",
            "description": "<p>领取列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.count",
            "description": "<p>领取总数</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"id\": \"1\",\n        \"user_id\": \"3\",\n        \"amount\": \"100.00\",\n        \"num\": \"1\",\n        \"header\": \"\",\n        \"nickname\": \"aicode\",\n        \"list\": [\n            {\n                \"id\": \"1\",\n                \"header\": \"http://thirdwx.qlogo.cn/mmopen/vi_32/\",\n                \"nickname\": \"小树\",\n                \"amount\": \"100.00\"\n            }\n        ],\n        \"count\": 1\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Bag.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/bag/add",
    "title": "红包-发布",
    "version": "1.0.0",
    "name": "bag_add",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/bag/add"
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
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>总金额</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "num",
            "description": "<p>总数量</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "room_id",
            "description": "<p>房间号</p>"
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
          "content": "{\n    \"data\": {\n        \"bag_id\": 7,\n        \"amount\": 100,\n        \"num\": 2\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Bag.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/bag/more",
    "title": "红包-详情-更多（翻页）",
    "version": "1.0.0",
    "name": "bag_more",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/bag/more"
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
            "type": "String",
            "optional": false,
            "field": "bag_id",
            "description": "<p>红包ID</p>"
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
            "field": "data.list",
            "description": "<p>领取列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.count",
            "description": "<p>领取总数</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"list\": [\n            {\n                \"id\": \"1\",\n                \"header\": \"http://thirdwx.qlogo.cn/mmopen/vi_32/\",\n                \"nickname\": \"小树\",\n                \"amount\": \"100.00\"\n            }\n        ],\n        \"count\": 1\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Bag.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/bag/receive",
    "title": "红包-领取",
    "version": "1.0.0",
    "name": "bag_receive",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/bag/receive"
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
            "type": "String",
            "optional": false,
            "field": "bag_id",
            "description": "<p>红包ID</p>"
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
            "type": "String",
            "optional": false,
            "field": "data.amount",
            "description": "<p>领取数量</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"amount\": \"31.61\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Bag.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/bag/view",
    "title": "红包-查看",
    "version": "1.0.0",
    "name": "bag_view",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/bag/view"
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
            "type": "String",
            "optional": false,
            "field": "room_id",
            "description": "<p>房间ID</p>"
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
            "type": "String",
            "optional": false,
            "field": "data.amount",
            "description": "<p>红包总金额</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.num",
            "description": "<p>红包总数量</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.use_amount",
            "description": "<p>被领取总金额</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.surplus_num",
            "description": "<p>红包剩余数量</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.header",
            "description": "<p>发红包者头像</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.nickname",
            "description": "<p>发红包者昵称</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"id\": \"7\",\n        \"created_at\": \"2018-04-13 20:18:55\",\n        \"user_id\": \"3\",\n        \"amount\": \"100.00\",\n        \"num\": \"2\",\n        \"room_id\": \"5\",\n        \"use_amount\": \"0.00\",\n        \"surplus_num\": \"1\",\n        \"header\": \"\",\n        \"nickname\": \"aicode\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Bag.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/users_bank",
    "title": "银行-列表",
    "version": "1.0.0",
    "name": "bank",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/users_bank"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": [\n        {\n            \"id\": \"1\",\n            \"user_name\": \"sz.ljx\",\n            \"user_card\": \"112233445566778899\",\n            \"bank_id\": \"1\",\n            \"mobi\": \"13830332488\",\n            \"bank_name\": \"工商银行\"\n        }\n    ],\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Users_bank.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/bind",
    "title": "账号绑定-列表",
    "version": "1.0.0",
    "name": "bind",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/bind"
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
            "field": "data.account_type",
            "description": "<p>所有绑定账号总集</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.list",
            "description": "<p>已绑定账号集</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"account_type\": [\n            \"手机\",\n            \"微信\",\n            \"QQ\",\n            \"微博\"\n        ],\n        \"list\": [\n            {\n                \"account_type\": \"0\",\n                \"unique_id\": \"13430331489\",\n                \"other\": []\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Bind.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/bind/save",
    "title": "账号绑定-修改",
    "version": "1.0.0",
    "name": "bind_save",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/bind/save"
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
            "type": "String",
            "optional": false,
            "field": "act",
            "description": "<p>操作动作 [mobi:手机, qq:QQ, wechat:微信, weibo:新浪微博]</p>"
          }
        ]
      }
    },
    "description": "<p>mobi传递参数: mobi,code qq传递参数: wechat传递参数: code码 weibo传递参数:</p>",
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
          "content": "{\n    \"data\": \"\",\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Bind.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/cart",
    "title": "购物车",
    "version": "1.0.0",
    "name": "cart",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/cart"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n\t   },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Cart.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/cart/add",
    "title": "购物车-添加",
    "version": "1.0.0",
    "name": "cart_add",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/cart/add"
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
            "type": "Number",
            "optional": false,
            "field": "goods_id",
            "description": "<p>商品唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "num",
            "description": "<p>购买数量</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "goods_attr",
            "description": "<p>商品属性 json</p>"
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
          "content": "{\n    \"data\": {\n\t   },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Cart.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/cart/buy",
    "title": "商品-直接购买",
    "version": "1.0.0",
    "name": "cart_buy",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/cart/buy"
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
            "type": "Number",
            "optional": false,
            "field": "goods_id",
            "description": "<p>商品唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "num",
            "description": "<p>购买数量</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "goods_attr",
            "description": "<p>商品属性 json</p>"
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
          "content": "{\n    \"data\": {\n\t   },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Cart.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/cart/count",
    "title": "购物车-数量",
    "version": "1.0.0",
    "name": "cart_count",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/cart/count"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"count\": 2\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Cart.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/cart/order",
    "title": "结算信息",
    "version": "1.0.0",
    "name": "cart_order",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/cart/order"
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
            "type": "String",
            "optional": false,
            "field": "cart_id",
            "description": "<p>1,2,3</p>"
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
          "content": "{\n    \"data\": {\n\t   },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Cart.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/cart/save",
    "title": "购物车-批编辑",
    "version": "1.0.0",
    "name": "cart_save",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/cart/save"
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
            "type": "String",
            "optional": false,
            "field": "goods_num",
            "description": "<p>json {商品唯一ID:数量} 数量0表示删除</p>"
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
          "content": "{\n    \"data\": {\n\t   },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Cart.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/collection",
    "title": "收藏&关注-列表",
    "version": "1.0.0",
    "name": "collection",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/collection"
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
            "type": "Number",
            "optional": false,
            "field": "topic",
            "description": "<p>主题类型 1关注 2收藏</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "t_id",
            "description": "<p>主题类型 = 1时传递 [0关注 1粉丝]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sub_topic",
            "description": "<p>主题类型 = 2时传递 10下载[10声音, 11专辑] 20已购[20声音, 21专辑] 30喜欢 40商品 50订阅</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Collection.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/collection/save",
    "title": "收藏&关注-保存OR取消",
    "version": "1.0.0",
    "name": "collection_save",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/collection/save"
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
            "type": "Number",
            "optional": false,
            "field": "t_id",
            "description": "<p>被关联唯一ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "topic",
            "description": "<p>主题类型 1关注 2收藏</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sub_topic",
            "description": "<p>子主题类型(关注不用传) 10下载[10声音, 11专辑] 20已购[20声音, 21专辑] 30喜欢 40商品 50订阅</p>"
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
          "content": "{\n\t    \"data\": \"\",\n\t    \"status\": 0,\n\t    \"message\": \"\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Collection.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/feedback/add",
    "title": "意见反馈-新增",
    "version": "1.0.0",
    "name": "feedback_add",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/feedback/add"
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
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>意见反馈内容</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "photos",
            "description": "<p>展示图 json</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Feedback.php",
    "groupTitle": "user"
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
    "url": "/api/user/gold",
    "title": "转余额",
    "version": "1.0.0",
    "name": "gold",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/gold"
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
            "type": "String",
            "optional": false,
            "field": "data.gold_to_rmb_rate",
            "description": "<p>金币转余额倍率</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.gold",
            "description": "<p>总金币量</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"gold\": \"10000\",\n        \"gold_to_rmb_rate\": 100\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Gold.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/gold/gift",
    "title": "礼物-记录",
    "version": "1.0.0",
    "name": "gold_gift",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/gold/gift"
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
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>in:收到 out:送出</p>"
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
          "content": "{\n    \"data\": {\n        \"count\": 1,\n        \"list\": [\n            {\n                \"id\": \"15\",\n                \"updated_at\": \"2018-03-28 23:54:57\",\n                \"item_title\": \"游轮\",\n                \"gold\": \"10000.00\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Gold.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/gold/record",
    "title": "转余额-记录",
    "version": "1.0.0",
    "name": "gold_record",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/gold/record"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"count\": 2,\n        \"list\": [\n            {\n                \"id\": \"13\",\n                \"updated_at\": \"2018-03-23 15:45:44\",\n                \"money\": \"1\",\n                \"gold\": \"100.00\"\n            },\n            {\n                \"id\": \"12\",\n                \"updated_at\": \"2018-03-23 15:44:14\",\n                \"money\": \"1\",\n                \"gold\": \"100.00\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Gold.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/income",
    "title": "收益明细",
    "version": "1.0.0",
    "name": "income",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/income"
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
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>0销售 1二级分销 2城市合伙人</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "topic",
            "description": "<p>主题 0知识 1直播 2商品</p>"
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
            "type": "Number",
            "optional": false,
            "field": "data.count",
            "description": "<p>总记录数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.list",
            "description": "<p>列表</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.id",
            "description": "<p>收益明细ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.updated_at",
            "description": "<p>更新日期</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.sub_topic",
            "description": "<p>知识主题才需要 1专辑 2音频</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.name",
            "description": "<p>关联用户名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.mobi",
            "description": "<p>关联用户手机</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.item_title",
            "description": "<p>项目标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.item_id",
            "description": "<p>项目ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.amount",
            "description": "<p>收益金额</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.gold",
            "description": "<p>收益金币</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"count\": 2,\n        \"list\": [\n            {\n                \"id\": \"4\",\n                \"updated_at\": \"2018-03-16 09:41:12\",\n                \"sub_topic\": \"2\",\n                \"name\": \"马化腾\",\n                \"mobi\": \"\",\n                \"item_title\": \"如果超人会飞\",\n                \"item_id\": \"1\",\n                \"amount\": \"10.00\",\n                \"gold\": \"0\"\n            },\n            {\n                \"id\": \"1\",\n                \"updated_at\": \"2018-03-16 09:29:09\",\n                \"sub_topic\": \"1\",\n                \"name\": \"马云\",\n                \"mobi\": \"\",\n                \"item_title\": \"[超人系列]\",\n                \"item_id\": \"1\",\n                \"amount\": \"200.00\",\n                \"gold\": \"0\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Income.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/info",
    "title": "用户中心",
    "version": "1.0.0",
    "name": "info",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/info"
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
            "type": "Object",
            "optional": false,
            "field": "data.user",
            "description": "<p>用户关联属性</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user.id",
            "description": "<p>用户唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user.nickname",
            "description": "<p>用户昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user.header",
            "description": "<p>用户头像</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user.v",
            "description": "<p>V标识 0否 1是</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user.anchor",
            "description": "<p>讲师标识 0:'未申请', 1:'待审核', 2:'已通过', 3:'已拒绝'</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user.seller",
            "description": "<p>卖家 0:'未申请', 1:'待审核', 2:'已通过', 3:'已拒绝'</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user.exp",
            "description": "<p>经验值</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.vip",
            "description": "<p>贵族信息 id=0表示无贵族</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.collection",
            "description": "<p>收藏数量</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.follow",
            "description": "<p>关注数量</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.fans",
            "description": "<p>粉丝数量</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"user\": {\n            \"id\": \"1\",\n            \"nickname\": \"aicode\",\n            \"header\": \"/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png\",\n            \"v\": \"0\",\n            \"anchor\": \"1\",\n            \"seller\": \"1\",\n            \"exp\": \"0\"\n        },\n        \"vip\": {\n            \"name\": \"\",\n            \"icon\": \"\",\n            \"id\": 0\n        },\n        \"collection\": 3,\n        \"follow\": 18,\n        \"fans\": 1\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Info.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/info/save",
    "title": "用户信息-修改",
    "version": "1.0.0",
    "name": "info_save",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/info/save"
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
            "type": "String",
            "optional": false,
            "field": "act",
            "description": "<p>操作动作 [修改密码:password, 支付密码:pay_password, 头像:header, 昵称:nickname, 性别:sex 0保密 1男 2女, 出生日期:birth 2018-01-12, 简介:summary]</p>"
          }
        ]
      }
    },
    "description": "<p>password传递参数: old_password,new_password,confirm_password pay_password传递参数: pay_password,confirm_password header传递参数：header nickname传递参数：nickname sex传递参数：sex birth传递参数：birth 接口返回age summary传递参数：summary</p>",
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
          "content": "{\n    \"data\": \"\",\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Info.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/info/view",
    "title": "用户信息-查看",
    "version": "1.0.0",
    "name": "info_view",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/info/view"
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
            "type": "String",
            "optional": false,
            "field": "data.header",
            "description": "<p>用户头像</p>"
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
            "field": "data.sex",
            "description": "<p>性别 1男 2女 0保密</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.birth",
            "description": "<p>出生日期</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.summary",
            "description": "<p>简介</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.age",
            "description": "<p>年龄</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.bind",
            "description": "<p>已绑定账号 0手机 1微信 2QQ 3微博</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"header\": \"\",\n        \"nickname\": \"aicode\",\n        \"sex\": \"0\",\n        \"birth\": \"2018-01-12\",\n        \"summary\": \"\",\n        \"age\": 0,\n        \"bind\": [\n            \"0\"\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Info.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/live",
    "title": "我的直播-首页",
    "version": "1.0.0",
    "name": "live",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/live"
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
            "type": "Object",
            "optional": false,
            "field": "data.anchor",
            "description": "<p>房间号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.anchor.name",
            "description": "<p>名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.anchor.updated_at",
            "description": "<p>加入日期</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.anchor.header",
            "description": "<p>头像</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.album",
            "description": "<p>专辑数量</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.work",
            "description": "<p>作品数量</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"data\": {\n        \"anchor\": {\n            \"name\": \"Qqqqqq\",\n            \"updated_at\": \"2018-02-07\",\n            \"header\": \"\"\n        },\n        \"album\": 0,\n        \"work\": 0\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Live.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/live/add",
    "title": "我的直播-创建",
    "version": "1.0.0",
    "name": "live_add",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/live/add"
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
            "type": "String",
            "optional": false,
            "field": "cover_image",
            "description": "<p>封面图</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "live_class",
            "description": "<p>直播类型</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "slide_photo",
            "description": "<p>幻灯片 json</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "start_at",
            "description": "<p>开始时间 time 1519707307</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>门票价格</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "city_partner_rate",
            "description": "<p>城市分销比例</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "two_level_rate",
            "description": "<p>二级分销比例</p>"
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
            "type": "Number",
            "optional": false,
            "field": "data.room_id",
            "description": "<p>房间号</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.chat_room_id",
            "description": "<p>聊天室ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.push_url",
            "description": "<p>推送地址</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.play_url",
            "description": "<p>播放地址</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"data\": {\n\t\t  \"chat_room_id\": 1,\n       \"room_id\": 1,\n       \"push_url\": \"rtmp://6077.livepush.myqcloud.com/live/6077_zhumaidan-1-2?bizid=6077&txSecret=cbe8817ff9e6185dd783b09c99ea9f20&txTime=5A7AF498\",\n       \"play_url\": \"{\\\"rtmp\\\":\\\"rtmp:\\\\/\\\\/6077.liveplay.myqcloud.com\\\\/live\\\\/6077_zhumaidan-1-2\\\",\\\"flv\\\":\\\"http:\\\\/\\\\/6077.liveplay.myqcloud.com\\\\/live\\\\/6077_zhumaidan-1-2.flv\\\",\\\"m3u8\\\":\\\"http:\\\\/\\\\/6077.liveplay.myqcloud.com\\\\/live\\\\/6077_zhumaidan-1-2.m3u8\\\"}\"\n   },\n   \"status\": 0,\n   \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Live.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/live_album",
    "title": "我的专辑-列表",
    "version": "1.0.0",
    "name": "live_album",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/live_album"
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
            "type": "Number",
            "optional": false,
            "field": "data.count",
            "description": "<p>总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.list",
            "description": "<p>专辑列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.list.id",
            "description": "<p>专辑唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.updated_at",
            "description": "<p>更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.cover_image",
            "description": "<p>专家背景</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.title",
            "description": "<p>专辑标题</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.list.price",
            "description": "<p>门票价</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"count\": 1,\n        \"list\": [\n            {\n                \"id\": \"7\",\n                \"updated_at\": \"2018-03-01 14:11:29\",\n                \"cover_image\": \"/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png\",\n                \"title\": \"你的出生地址\",\n                \"price\": \"10000.00\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Live_album.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/live_album/save",
    "title": "我的专辑-编辑 OR 新增",
    "version": "1.0.0",
    "name": "live_album_save",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/live_album/save"
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
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>记录唯一ID 0表示新增 其他表示编辑</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cover_image",
            "description": "<p>封面图</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "album_class",
            "description": "<p>专辑类型</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "album_tag",
            "description": "<p>专辑标签 ,配音,铃声,</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>门票价格</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "city_partner_rate",
            "description": "<p>城市分销比例</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "two_level_rate",
            "description": "<p>二级分销比例</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "public",
            "description": "<p>是否公开 0否 1是</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "deleted",
            "description": "<p>删除 1删除 不传或0不处理</p>"
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
          "content": "{\n\t    \"data\": \"\",\n\t    \"status\": 0,\n\t    \"message\": \"\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Live_album.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/live_audio",
    "title": "我的音频-列表",
    "version": "1.0.0",
    "name": "live_audio",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/live_audio"
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
            "type": "Number",
            "optional": false,
            "field": "data.count",
            "description": "<p>总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.list",
            "description": "<p>音频列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.list.id",
            "description": "<p>音频唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.created_at",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.list.duration",
            "description": "<p>时长 秒</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.video_url",
            "description": "<p>音频地址</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.cover_image",
            "description": "<p>音频背景</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.title",
            "description": "<p>音频标题</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.list.price",
            "description": "<p>门票价</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.album_title",
            "description": "<p>专辑标题</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"count\": 2,\n        \"list\": [\n            {\n                \"id\": \"4\",\n                \"created_at\": \"2018-03-01 12:30:15\",\n                \"duration\": \"1140\",\n                \"video_url\": \"http://1253104369.vod2.myqcloud.com/26be7741vodgzp1253104369/4bbd9ba67447398154874879756/f0.flv\",\n                \"album_id\": \"0\",\n                \"title\": \"你的出生地址\",\n                \"price\": \"0.00\",\n                \"cover_image\": \"/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png\",\n                \"room_id\": \"6\",\n                \"album_title\": \"\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Live_audio.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/live_audio/save",
    "title": "我的音频-编辑",
    "version": "1.0.0",
    "name": "live_audio_save",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/live_audio/save"
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
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>记录唯一ID 0表示新增 其他表示编辑</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cover_image",
            "description": "<p>封面图</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "album_id",
            "description": "<p>专辑ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>门票价格</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "city_partner_rate",
            "description": "<p>城市分销比例</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "two_level_rate",
            "description": "<p>二级分销比例</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "deleted",
            "description": "<p>删除 1删除 不传或0不处理</p>"
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
          "content": "{\n\t    \"data\": \"\",\n\t    \"status\": 0,\n\t    \"message\": \"\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Live_audio.php",
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
    "url": "/api/user/login/bind",
    "title": "第三方授权-强制绑手机",
    "version": "1.0.0",
    "name": "login_bind",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/login/bind"
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
            "description": "<p>绑定手机</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>短信验证码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bind_id",
            "description": "<p>第三方登录返回bind_id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>登录密码</p>"
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
    "url": "/api/user/login/wechat",
    "title": "微信登录",
    "version": "1.0.0",
    "name": "login_wechat",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/login/wechat"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>APP授权code</p>"
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
            "description": "<p>接口数据集 如果存在auth表名登录成功，否则强制转手机绑定页</p>"
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
    "url": "/api/user/order",
    "title": "订单-列表",
    "version": "1.0.0",
    "name": "order",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/order"
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
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>订单状态 -1全部 -2退单</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "is_seller",
            "description": "<p>1卖出订单 0买入订单(私人)</p>"
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
          "content": "{\n    \"data\": {\n\t   },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Order.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/order_action/buyer",
    "title": "订单操作-买家",
    "version": "1.0.0",
    "name": "order_action_buyer",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/order_action/buyer"
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
            "type": "String",
            "optional": false,
            "field": "order_id",
            "description": "<p>订单号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>{cancel:取消, del:删除, pay:付款, remind:提醒发货, refund:退款/退货, express:查看物流, goods_confirm:确认收货, evaluate:评价, invoice:申请发票}</p>"
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
          "content": "{\n    \"data\": {\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Order_action.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/order_action/seller",
    "title": "订单操作-卖家",
    "version": "1.0.0",
    "name": "order_action_seller",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/order_action/seller"
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
            "type": "String",
            "optional": false,
            "field": "order_id",
            "description": "<p>订单号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>{change_price:改价, goods_send:发货, express:查看物流, complete:退款/退货审核}</p>"
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
          "content": "{\n    \"data\": {\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Order_action.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/order/add",
    "title": "订单-下单",
    "version": "1.0.0",
    "name": "order_add",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/order/add"
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
            "type": "String",
            "optional": false,
            "field": "addressInfo",
            "description": "<p>收货人信息</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "seller",
            "description": "<p>商家信息组</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cart_id",
            "description": "<p>1,2,3</p>"
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
          "content": "{\n    \"data\": {\n        \"pay_sn\": \"870069426068845\",\n        \"total\": 131.5,\n        \"ticket\": 16,\n        \"point_amount\": 20,\n        \"point\": 20\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Order.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/order_payment",
    "title": "订单付款页",
    "version": "1.0.0",
    "name": "order_payment",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/order_payment"
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
            "type": "String",
            "optional": false,
            "field": "trade_type",
            "description": "<p>交易类型 pay_sn:下单支付号 order_sn:商家订单号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "trade_sn",
            "description": "<p>交易号</p>"
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
            "type": "String",
            "optional": false,
            "field": "data.total_amount",
            "description": "<p>订单总金额</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.real_total_amount",
            "description": "<p>实付总金额</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.use_ticket_amount",
            "description": "<p>优惠总金额</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.use_point_amount",
            "description": "<p>积分抵扣总金额</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.use_point",
            "description": "<p>积分总数</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"total_amount\": \"145.50\",\n        \"real_total_amount\": \"115.50\",\n        \"use_ticket_amount\": \"10.00\",\n        \"use_point_amount\": \"20.00\",\n        \"use_point\": \"20\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Order_payment.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/order/view",
    "title": "订单-详情",
    "version": "1.0.0",
    "name": "order_view",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/order/view"
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
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>订单状态 -1全部 -2退单</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order_id",
            "description": "<p>订单号</p>"
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
          "content": "{\n    \"data\": {\n        \"order\": {\n            \"id\": \"1\",\n            \"created_at\": \"2018-03-14 13:01:08\",\n            \"updated_at\": \"2018-03-14 13:01:08\",\n            \"deleted\": \"0\",\n            \"status\": \"0\",\n            \"enable\": \"1\",\n            \"pay_sn\": \"870069426068845\",\n            \"order_sn\": \"280069426068852001\",\n            \"seller_uid\": \"1\",\n            \"total_amount\": \"145.50\",\n            \"real_total_amount\": \"115.50\",\n            \"use_ticket_amount\": \"10.00\",\n            \"use_point_amount\": \"20.00\",\n            \"buyer_uid\": \"1\",\n            \"refund_status\": \"0\",\n            \"has_e_invoice\": \"0\",\n            \"address_info\": \"{\\\"username\\\":\\\"daihanqiao\\\",\\\"mobi\\\":\\\"18507558811\\\",\\\"address\\\":\\\"河北省-唐山市-路南区 2313\\\"}\",\n            \"message\": \"留言1\",\n            \"use_point\": \"20\",\n            \"ticket_info\": \"{\\\"full_amount\\\":\\\"100\\\",\\\"free_amount\\\":\\\"10\\\"}\"\n        },\n        \"evaluate\": [],\n        \"invoice\": [],\n        \"goods\": [\n            {\n                \"id\": \"1\",\n                \"order_id\": \"1\",\n                \"goods_id\": \"4\",\n                \"goods_price\": \"20.00\",\n                \"num\": \"1\",\n                \"freight_fee\": \"2.00\",\n                \"goods_attr\": \"{\\\"7\\\":[\\\"1L\\\"],\\\"8\\\":[\\\"白色\\\"]}\",\n                \"name\": \"测试商品\",\n                \"default_image\": \"/uploads/2018/01/23/3b3b5b51b0290d787276d741f1c0f81d.png\"\n            },\n            {\n                \"id\": \"2\",\n                \"order_id\": \"1\",\n                \"goods_id\": \"26\",\n                \"goods_price\": \"100.00\",\n                \"num\": \"1\",\n                \"freight_fee\": \"1.50\",\n                \"goods_attr\": \"{\\\"6\\\":[\\\"xxl\\\"],\\\"8\\\":[\\\"红色\\\"]}\",\n                \"name\": \"完美小金瓶\",\n                \"default_image\": \"/uploads/2018/03/13/c1f71ad3579f0543685a92ce663c8532.png\"\n            },\n            {\n                \"id\": \"3\",\n                \"order_id\": \"1\",\n                \"goods_id\": \"4\",\n                \"goods_price\": \"20.00\",\n                \"num\": \"1\",\n                \"freight_fee\": \"2.00\",\n                \"goods_attr\": \"\",\n                \"name\": \"测试商品\",\n                \"default_image\": \"/uploads/2018/01/23/3b3b5b51b0290d787276d741f1c0f81d.png\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Order.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/partner",
    "title": "分销-主页",
    "version": "1.0.0",
    "name": "partner",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/partner"
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
            "type": "String",
            "optional": false,
            "field": "data.nickname",
            "description": "<p>昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.header",
            "description": "<p>头像</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.check_city_partners",
            "description": "<p>已开通城市合伙人 0否 1待审核 2是</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"nickname\": \"aicode\",\n        \"header\": \"\",\n        \"check_city_partners\": \"0\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Partner.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/partner/add",
    "title": "分销-人员添加(二级&合伙人)",
    "version": "1.0.0",
    "name": "partner_add",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/partner/add"
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
            "field": "type",
            "description": "<p>0城市合伙人 1二级分销</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobi",
            "description": "<p>合伙人手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "area",
            "description": "<p>省市区 英文逗号分割 二级分销不用传，城市合伙人必传</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Partner.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/partner/apply",
    "title": "分销-申请(城市合伙人)",
    "version": "1.0.0",
    "name": "partner_apply",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/partner/apply"
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
            "description": "<p>管理员唯一ID</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Partner.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/partner/record",
    "title": "分销-人员列表",
    "version": "1.0.0",
    "name": "partner_record",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/partner/record"
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
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>0城市合伙人 1二级分销</p>"
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
            "type": "String",
            "optional": false,
            "field": "data.user_id",
            "description": "<p>为0表示添加的城市合伙人手机号未注册</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"count\": 3,\n        \"list\": [\n            {\n                \"id\": \"3\",\n                \"mobi\": \"13888888888\",\n                \"area\": \"湖南省,衡阳市,珠晖区\",\n                \"user_id\": 0\n            },\n            {\n                \"id\": \"1\",\n                \"mobi\": \"13430332489\",\n                \"area\": \"广东省,深圳市,南山区\",\n                \"user_id\": \"1\",\n                \"nickname\": \"aicode\",\n                \"header\": \"\",\n                \"v\": \"0\",\n                \"exp\": \"0\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Partner.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/payment_log/dialog",
    "title": "购买-弹框判断",
    "version": "1.0.0",
    "name": "payment_log_dialog",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/payment_log/dialog"
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
            "type": "String",
            "optional": false,
            "field": "topic",
            "description": "<p>主题 直播：live 音频：audio 专辑：album</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "t_id",
            "description": "<p>项目唯一ID</p>"
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
            "type": "String",
            "optional": false,
            "field": "data.dialog",
            "description": "<p>0已付费 1未付费弹支付框</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"dialog\": 1\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Payment_log.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/payment_log/payment",
    "title": "购买-支付",
    "version": "1.0.0",
    "name": "payment_log_payment",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/payment_log/payment"
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
            "type": "String",
            "optional": false,
            "field": "payment_type",
            "description": "<p>支付类型 balance：余额 wechat：微信 alipay：支付宝</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "topic",
            "description": "<p>主题 直播：live 音频：audio 专辑：album</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "t_id",
            "description": "<p>项目唯一ID</p>"
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
          "content": "{\n\t   \"data\": \"\",\n    \"status\": -1,\n    \"message\": \"签名校验错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Payment_log.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/payment_log/view",
    "title": "购买-下单",
    "version": "1.0.0",
    "name": "payment_log_view",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/payment_log/view"
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
            "type": "String",
            "optional": false,
            "field": "topic",
            "description": "<p>主题 直播：live 音频：audio 专辑：album</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "t_id",
            "description": "<p>项目唯一ID</p>"
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
          "content": "{\n    \"data\": {\n        \"id\": \"1\",\n        \"cover_image\": \"/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png\",\n        \"title\": \"你的出生地址\",\n        \"price\": \"10000.00\",\n        \"city_partner_rate\": \"0.00\",\n        \"two_level_rate\": \"0.00\",\n        \"balance\": \"9800.10\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Payment_log.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/pretty/payment",
    "title": "靓号-购买-支付",
    "version": "1.0.0",
    "name": "pretty_payment",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/pretty/payment"
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
            "type": "String",
            "optional": false,
            "field": "payment_type",
            "description": "<p>支付类型 balance：余额 wechat：微信 alipay：支付宝</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>靓号唯一ID</p>"
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
          "content": "{\n\t   \"data\": \"\",\n    \"status\": -1,\n    \"message\": \"签名校验错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Pretty.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/pretty/view",
    "title": "靓号-购买-下单",
    "version": "1.0.0",
    "name": "pretty_view",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/pretty/view"
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
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>靓号唯一ID</p>"
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
          "content": "{\n\t   \"data\": \"\",\n    \"status\": -1,\n    \"message\": \"签名校验错误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Pretty.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/recharge",
    "title": "充值",
    "version": "1.0.0",
    "name": "recharge",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/recharge"
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
            "type": "String",
            "optional": false,
            "field": "data.rmb_to_gold_rate",
            "description": "<p>充值金币兑换倍率</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"rmb_to_gold_rate\": 100\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Recharge.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/recharge/record",
    "title": "充值-记录",
    "version": "1.0.0",
    "name": "recharge_record",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/recharge/record"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"count\": 1,\n        \"list\": [\n            {\n                \"id\": \"9\",\n                \"updated_at\": \"2018-03-23 15:11:00\",\n                \"order_sn\": \"112233445566778899\",\n                \"amount\": \"100.00\",\n                \"real_amount\": \"100.00\",\n                \"payment_id\": \"0\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Recharge.php",
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
  },
  {
    "type": "get",
    "url": "/api/user/resource",
    "title": "主播资源-列表",
    "version": "1.0.0",
    "name": "resource",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/resource"
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
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>资源类型 0:ppt 1:bg_music</p>"
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
            "type": "Number",
            "optional": false,
            "field": "data.count",
            "description": "<p>总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.list",
            "description": "<p>资源列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.list.id",
            "description": "<p>资源唯一ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.updated_at",
            "description": "<p>更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.name",
            "description": "<p>名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.list.content",
            "description": "<p>资源内容 ppt(json) bg_music(url)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.list.other",
            "description": "<p>补充信息 示例：时长</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"count\": 1,\n        \"list\": [\n            {\n                \"id\": \"62\",\n                \"updated_at\": \"2018-03-22 12:01:17\",\n                \"name\": \"工商银行\",\n                \"content\": \"没意见，挺好的\",\n                \"other\": \"\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Resource.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/resource/add",
    "title": "主播资源-新增",
    "version": "1.0.0",
    "name": "resource_add",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/resource/add"
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
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>资源类型 0:ppt 1:bg_music</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>资源内容 ppt(json) bg_music(url)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "other",
            "description": "<p>补充信息 示例：时长</p>"
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
          "content": "{\n    \"data\": {\n\t   },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Resource.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/resource/del",
    "title": "主播资源-删除",
    "version": "1.0.0",
    "name": "resource_del",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/resource/del"
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
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>资源类型 0:ppt 1:bg_music</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "s_id",
            "description": "<p>资源ID 多个英文逗号分割：1,2,3</p>"
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
          "content": "{\n    \"data\": {\n\t   },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Resource.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/security_question/check",
    "title": "密保-验证页",
    "version": "1.0.0",
    "name": "security_question_check",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/security_question/check"
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
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/security_question/check_in",
    "title": "密保-验证",
    "version": "1.0.0",
    "name": "security_question_check_in",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/security_question/check_in"
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
          "content": "{\n    \"data\": [],\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/shop",
    "title": "我的商城",
    "version": "1.0.0",
    "name": "shop",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/shop"
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
            "description": "<p>接口数据集 建议用forin遍历buyer 和 seller</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"header\": \"/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png\",\n        \"nickname\": \"aicode\",\n        \"anchor\": \"1\",\n        \"seller\": \"1\",\n        \"buyer\": [\n            \"8\"\n        ],\n        \"seller\": [\n            \"5\"\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Shop.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/shop/add",
    "title": "我的商城-申请开店",
    "version": "1.0.0",
    "name": "shop_add",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/shop/add"
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
            "description": "<p>接口数据集 建议用forin遍历buyer 和 seller</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"header\": \"/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png\",\n        \"nickname\": \"aicode\",\n        \"anchor\": \"1\",\n        \"seller\": \"1\",\n        \"buyer\": [\n            \"8\"\n        ],\n        \"seller\": [\n            \"5\"\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Shop.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/shop/static_goods",
    "title": "我的商城-统计商品",
    "version": "1.0.0",
    "name": "shop_static_goods",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/shop/static_goods"
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
            "description": "<p>接口数据集 建议用forin遍历buyer 和 seller</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"header\": \"/uploads/2018/03/28/5cdb0bb0f079ec4b61e379d8962a6f75.png\",\n        \"nickname\": \"aicode\",\n        \"anchor\": \"1\",\n        \"seller\": \"1\",\n        \"buyer\": [\n            \"8\"\n        ],\n        \"seller\": [\n            \"5\"\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Shop.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/users_bank/save",
    "title": "银行-编辑 OR 新增",
    "version": "1.0.0",
    "name": "users_bank_save",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/users_bank/save"
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
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>记录唯一ID 0表示新增 其他表示编辑</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_name",
            "description": "<p>持卡人</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_card",
            "description": "<p>持卡号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bank_id",
            "description": "<p>持卡银行</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobi",
            "description": "<p>预留手机号</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Users_bank.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/v/save",
    "title": "V认证-提交",
    "version": "1.0.0",
    "name": "v_save",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/v/save"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n\t   },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/V.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/wallet",
    "title": "我的钱包",
    "version": "1.0.0",
    "name": "wallet",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/wallet"
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
            "type": "String",
            "optional": false,
            "field": "data.balance",
            "description": "<p>余额</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.point",
            "description": "<p>积分</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.gold",
            "description": "<p>金币</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.income",
            "description": "<p>收益</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.income.goods",
            "description": "<p>商品</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.income.knowledge",
            "description": "<p>知识</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"balance\": \"9802.00\",\n        \"point\": \"950\",\n        \"income\": {\n            \"knowledge\": \"210.00\",\n            \"goods\": \"2000.00\"\n        },\n        \"gold\": \"9800\"\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Wallet.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/withdraw",
    "title": "提现",
    "version": "1.0.0",
    "name": "withdraw",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/withdraw"
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
            "type": "Number",
            "optional": false,
            "field": "user_bank_id",
            "description": "<p>用户银行卡ID 默认0(取最新记录) 其他表示选择指定卡</p>"
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
          "content": "{\n    \"data\": {\n        \"balance\": \"0.00\",\n        \"bank\": {\n            \"id\": \"1\",\n            \"user_name\": \"sz.ljx\",\n            \"user_card\": \"112233445566778899\",\n            \"bank_id\": \"1\",\n            \"mobi\": \"13830332488\",\n            \"bank_name\": \"工商银行\"\n        }\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Withdraw.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/user/withdraw/add",
    "title": "提现-提交",
    "version": "1.0.0",
    "name": "withdraw_add",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/withdraw/add"
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
            "type": "Number",
            "optional": false,
            "field": "user_bank_id",
            "description": "<p>用户银行卡ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>提现金额</p>"
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
          "content": "{\n    \"data\": {\n        \"count\": 1,\n        \"list\": [\n            {\n                \"id\": \"5\",\n                \"updated_at\": \"2018-03-16 11:32:32\",\n                \"order_sn\": \"112233445566778899\",\n                \"item_id\": \"1\",\n                \"amount\": \"550.00\",\n                \"real_amount\": \"500.00\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Withdraw.php",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/user/withdraw/record",
    "title": "提现-记录",
    "version": "1.0.0",
    "name": "withdraw_record",
    "group": "user",
    "sampleRequest": [
      {
        "url": "/api/user/withdraw/record"
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
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>记录ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.created_at",
            "description": "<p>申请时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.status",
            "description": "<p>状态 0待处理 1已汇款 2异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user_name",
            "description": "<p>收款人</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user_card",
            "description": "<p>收款账号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.mobi",
            "description": "<p>预留手机号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.bank_name",
            "description": "<p>卡户银行</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.amount",
            "description": "<p>提现金额</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"count\": 1,\n        \"list\": [\n            {\n                \"id\": \"3\",\n                \"created_at\": \"2018-03-23 10:22:22\",\n                \"status\": \"0\",\n                \"user_name\": \"sz.ljx\",\n                \"user_card\": \"112233445566778899\",\n                \"mobi\": \"13830332488\",\n                \"bank_name\": \"工商银行\",\n                \"amount\": \"100.00\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/user/Withdraw.php",
    "groupTitle": "user"
  }
] });
