# plian-ipfs

#### Quick Start

```
npm install
node index.js
```

#### Rest API

###### **API-upload-file**

> **URL **

> URL: /upload-file
>
> **OutputType**
>
> JSON
>
> **type**
>
> POST
>
> **Input param**
>
> | param | necessary | type | default | detail |
> | ----- | --------- | ---- | ------- | ------ |
> | file  | TRUE      | File | null    | File   |

> **Output param**

> | param    | type       | detail                            |
> | -------- | ---------- | --------------------------------- |
> | errcode  | uint32     | errcode，0-success，1001-inputerr |
> | msg      | string     | detail                            |
> | result   | jsonObject | result                            |
> | name     | string     | name                              |
> | mimetype | string     | mimetype                          |
> | size     | uint32     | size                              |
> | ipfshash | string     | ipfshash                          |

> **API Example**

> url：<http://127.0.0.1:8081/upload-file>

> - Request：

```
{
  "file": file<type file>,
}
```

> - Respone

```
HTTP/1.1 200 OK
{
    "errcode": 0,
    "msg": "Success.",
    "data": {
        "name": "IMG_2695.JPG",
        "type": "image/jpeg",
        "size": 39682,
        "ipfshash": "https://ipfs.io/ipfs/QmWJPDHzdJHmmweXp1enRRAdQ7TS5pwjexxJaqu2mi4AjN"
    }
}
```
