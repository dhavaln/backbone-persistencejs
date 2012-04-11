(this is extending the original source of https://github.com/dmfrancisco/Desligado)

I have separated the original sync.js file into separate configurations files to support multiple entities.

* [database-util.js][files-0] Contains CRUD and CURD Wrapper
* [database.js][files-1] Contains database init, schema config and CRUD settings
* [sync.js][files-2] Contains synchronization logic

[files-0]: https://github.com/dhavaln/backbone-persistencejs/blob/master/app/database-util.js
[files-1]: https://github.com/dhavaln/backbone-persistencejs/blob/master/app/database.js
[files-2]: https://github.com/dhavaln/backbone-persistencejs/blob/master/app/sync.js

To add new entities, refer database.js and sync.js