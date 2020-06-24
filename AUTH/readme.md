* instalujemy express i generatora template
    * `npm install -g express`
    * `npm install -g express-generator`
* tworzymy template
    * `express`

* download bootstrap
    * `https://getbootstrap.com/docs/4.0/getting-started/download/`

* copy `bootstrap.js` to `public/javascripts`
* copy `bootstrap.css` to `public/stylesheets`

* mongo
    * install `https://www.mongodb.com/download-center` -> `community server`
    * dodajemy w zmiennych środowiskowych w PATH `C:\Program Files\MongoDB\Server\3.6\bin`
    * tworzymy folder dla baz danych `C:\mongo\data\db`
    * uruchamiamy server mongo `mongod -dbpath c:\mongo\data\db`
    * uruchamiamy klienta mongo `mongo`
        * pokazuje aktulanie wybraną bazę danych
            * > db    
        * pokazuje listę dostępnych baz danych
            * > show dbs
        * zmienia aktualną bazę danych
            * > use nazwa_bazy_danych [admin, config, local, nodeauth]
        * pokazuje userów zapisanych w bazie
            * >  db.users.find()
            * > db.users.find().pretty()
        * pokazuje aktulane kolekcje danych (tabele)
            * > show collections
        
        
* kodowanie hasła usera `bcryptjs`
* authentication logowanie `http://www.passportjs.org/`
    * `http://www.passportjs.org/docs/authenticate/`
    
