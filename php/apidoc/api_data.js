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
          "content": "{\n    \"data\": {\n        \"1\": {\n            \"name\": \"内容\",\n            \"limit\": \"3\",\n            \"list\": [\n                {\n                    \"6\": \"广告\"\n                },\n                {\n                    \"5\": \"铃声\"\n                },\n                {\n                    \"4\": \"配音\"\n                },\n                {\n                    \"3\": \"声音日记\"\n                }\n            ]\n        },\n        \"2\": {\n            \"name\": \"播讲\",\n            \"limit\": \"2\",\n            \"list\": [\n                {\n                    \"8\": \"体育\"\n                },\n                {\n                    \"7\": \"广告\"\n                }\n            ]\n        }\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
            "description": "<p>别名</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Express.php",
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
            "field": "data.online",
            "description": "<p>直播中</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.trailer",
            "description": "<p>预告</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"ad\": [\n            {\n                \"title\": \"\",\n                \"link\": \"\",\n                \"image\": \"/uploads/2018/02/28/35e9694b2fc8a48148d4ac415fa8a30d.jpg\"\n            }\n        ],\n        \"anchor\": [\n            {\n               \"id\": \"1\",\n                \"nickname\": \"aicode\",\n                \"header\": \"\",\n                \"v\": \"0\"\n            }\n        ],\n        \"online\": [\n            {\n                \"room_id\": \"4\",\n                \"title\": \"你的出生地址\",\n                \"cover_image\": \"/uploads/2018/01/31/a2e0b9485cb752ad7534fd8b86ebd233.png\",\n       \"play_url\": \"{\\\"rtmp\\\":\\\"rtmp:\\\\/\\\\/6077.liveplay.myqcloud.com\\\\/live\\\\/6077_zhumaidan-1-2\\\",\\\"flv\\\":\\\"http:\\\\/\\\\/6077.liveplay.myqcloud.com\\\\/live\\\\/6077_zhumaidan-1-2.flv\\\",\\\"m3u8\\\":\\\"http:\\\\/\\\\/6077.liveplay.myqcloud.com\\\\/live\\\\/6077_zhumaidan-1-2.m3u8\\\"}\",\n                \"live_tag_id\": \"0\",\n                \"anchor_uid\": \"1\",\n                \"views\": \"0\",\n                \"nickname\": \"aicode\",\n                \"v\": \"0\",\n                \"price\": \"0.00\"\n            }\n        ]\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n      {\n          \"id\": \"3\",\n          \"is_default\": \"1\",\n          \"username\": \"龙建新-1024\",\n          \"mobi\": \"13430332489\",\n          \"province_id\": \"110000\",\n          \"province\": \"北京市\",\n          \"city_id\": \"110101\",\n          \"city\": \"东城区\",\n          \"area_id\": \"0\",\n          \"area\": \"\",\n          \"mailbox\": \"清华园1024号\",\n      }\n ],\n \"status\": 0,\n \"message\": \"成功\"\n}",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t    \"data\": {\n\t        \"id\": \"1\",\n\t        \"title\": \"热门\",\n\t        \"summary\": \"热门\",\n\t        \"content\": \"热门\"\n\t    },\n\t    \"status\": 0,\n\t    \"message\": \"成功\"\n\t}",
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
    "title": "店铺",
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Seller.php",
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
            "field": "data.points.count",
            "description": "<p>积分变动总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.points.list",
            "description": "<p>积分变动记录</p>"
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
    "filename": "E:/www/project/taskusbipowggnphe/php/application/controllers/api/Users_points.php",
    "groupTitle": "api"
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
            "type": "String",
            "optional": false,
            "field": "data.mobi",
            "description": "<p>绑定手机 空表示未绑定</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.qq_uid",
            "description": "<p>绑定QQ 空表示未绑定</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.weixin_uid",
            "description": "<p>绑定微信 空表示未绑定</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.weibo_uid",
            "description": "<p>绑定微博 空表示未绑定</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"mobi\": \"13430332489\",\n        \"qq_uid\": \"\",\n        \"weixin_uid\": \"\",\n        \"weibo_uid\": \"\",\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
            "description": "<p>操作动作 [mobi:手机, qq:QQ, weixin:微信, weibo:新浪微博]</p>"
          }
        ]
      }
    },
    "description": "<p>mobi传递参数: mobi,code qq传递参数: weixin传递参数: weibo传递参数:</p>",
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
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job",
            "description": "<p>默认不传，传order表示下单页，结构调整为data.point,data.point</p>"
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
            "type": "String",
            "optional": false,
            "field": "goods_attr",
            "description": "<p>商品属性 json</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job",
            "description": "<p>默认不传，传order表示下单页，结构调整为data.point,data.point</p>"
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
    "title": "收藏&关注-保存",
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
            "description": "<p>讲师标识 0否 1是</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.user.seller",
            "description": "<p>卖家 0否 1是</p>"
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
            "field": "data.user.vip_id",
            "description": "<p>贵族级别 0无</p>"
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
          "content": "{\n   \"data\": {\n       \"user\": {\n           \"id\": \"1\",\n           \"nickname\": \"aicode\",\n           \"header\": \"\",\n           \"v\": \"0\",\n           \"anchor\": \"0\",\n           \"seller\": \"0\",\n           \"exp\": \"0\",\n           \"vip_id\": \"0\"\n       },\n       \"collection\": 0,\n       \"follow\": 4,\n       \"fans\": 1\n   },\n   \"status\": 0,\n   \"message\": \"成功\"\n}",
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
            "field": "data.mobi",
            "description": "<p>绑定手机 空表示未绑定</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.qq_uid",
            "description": "<p>绑定QQ 空表示未绑定</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.weixin_uid",
            "description": "<p>绑定微信 空表示未绑定</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.weibo_uid",
            "description": "<p>绑定微博 空表示未绑定</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.age",
            "description": "<p>年龄</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"header\": \"\",\n        \"nickname\": \"aicode\",\n        \"sex\": \"0\",\n        \"birth\": \"2018-01-12\",\n        \"summary\": \"\",\n        \"mobi\": \"13430332489\",\n        \"qq_uid\": \"\",\n        \"weixin_uid\": \"\",\n        \"weibo_uid\": \"\",\n        \"age\": 0\n    },\n    \"status\": 0,\n    \"message\": \"成功\"\n}",
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
            "description": "<p>直播类型 ,1,3,</p>"
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
          "content": "{\n   \"data\": {\n       \"room_id\": 1,\n       \"push_url\": \"rtmp://6077.livepush.myqcloud.com/live/6077_zhumaidan-1-2?bizid=6077&txSecret=cbe8817ff9e6185dd783b09c99ea9f20&txTime=5A7AF498\",\n       \"play_url\": \"{\\\"rtmp\\\":\\\"rtmp:\\\\/\\\\/6077.liveplay.myqcloud.com\\\\/live\\\\/6077_zhumaidan-1-2\\\",\\\"flv\\\":\\\"http:\\\\/\\\\/6077.liveplay.myqcloud.com\\\\/live\\\\/6077_zhumaidan-1-2.flv\\\",\\\"m3u8\\\":\\\"http:\\\\/\\\\/6077.liveplay.myqcloud.com\\\\/live\\\\/6077_zhumaidan-1-2.m3u8\\\"}\"\n   },\n   \"status\": 0,\n   \"message\": \"成功\"\n}",
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
  }
] });
