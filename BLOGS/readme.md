* start build project
    * instalujemy `express-generator`
        * `npm install -g express-generator`
    * tworzymy template
        * `express nodeblog`
    * install dependencies
        * `cd nodeblog && npm install`
    * run the application
        * `npm start`
        
* uruchamiamy bazę danych
    * `C:\>mongod --config "C:\mongo\mongod.conf"`
    * w systemie powinna być ustawiona ścieżka PATH w enviroments do katalogu 
        `C:\Program Files\MongoDB\Server\3.6\bin`
    * stworzony katalog `C:\mongo\data\db`
    * stworzony katalog `C:\mongo\log` z plikiem `mongod.log` jeśli chcemy zapisywać tam logi
    * oraz dodany plik `mongod.conf` w `C:\mongo\`
    * o treści
        * ```
            // section `systemLog` tylko jeśli chcemy korzystać z `mongod.log`
            systemLog:
              destination: file
              path: "c:\mongo\log\mongod.log"
            storage:
                dbPath: 'c:\mongo\data\db'
          ```
    * uruchamiamy clienta mongo
        * `mongo`
    * możemy teraz utworzyć nową bazę danych i wyswietlić wszystkie
        * > use nodeblog
        * > db
    * tworzymy kolekcję
        * > db.createCollection('categories')
        * > db.createCollection('posts')
        * > db.posts.insert({title:"Blog Post One", category:"Technology", author:"Brad Traversy", body:"This is the body", date:ISODate()})
        * > db.posts.find().pretty()
    * sprawdzamy poprawność utworzenia
        * > show dbs
        * > show collections
        * > db
    * usuwamy całą kolekcją
        * > db.categories.remove({})
        * > db.posts.remove({})
        
* run application
    * npm run db
    * npm start  
    
* obecnie nie trzeba uruchamiać skryptu `npm run db`
    * proces uruchomienia bazy danych odbywa się w `mongod.js` metoda `run`

* jade
    * `https://naltatis.github.io/jade-syntax-docs/`
    * `https://automattic.github.io/monk/docs/Debugging.html`
    
