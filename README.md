# Test task: Ajax Table 

This project is a solution to a test table.

## Preparation 

You will install Docker and docker-compose (https://docs.docker.com/compose/install/)

## Build your new env.

### Get the code from git.
```
git clone https://github.com/DmitriiGrekov/test_table
cd test_table 
```

### Build the base images
```
docker-compose build
```

### Migrate databases and  create django superuser 
```
docker-compose run web python manage.py migrate 
docker-compose run web python manage.py createsuperuser
```

_If you have a mistake_ ___Is the server running on host "db" (192.168.80.2) and accepting TCP/IP connections on port 5432?___ _replace the line in_ `docker-compose.yml`

```
ports:
    - "54321:5432"
```

On

```
ports:
    - "5432:5432"

```

If you want to change the database login data, change the settings in `test_task_api/blog/settings.py`, Replace the current DATABASES with
```
DATABASES = {
    'default': {
        'ENGINE': "django.db.backends.postgresql_psycopg2",
        "NAME": "django_db",
        'USER': "admin",
        "PASSWORD": "admin",
        "HOST": "db",
    }
}

```

And modify `docker-compose.yml`

```
environment:
    POSTGRES_USER: admin
    POSTGRES_PASSWORD: admin
    POSTGRES_DB: django_db
```


### Starting the project
```
docker-compose up -d
```

_If you have a mistake_ ___Error starting userland proxy: listen tcp4 0.0.0.0:5432: bind: address already in use___ _replace the line in_ `docker-compose.yml`

```
ports:
    - "5432:5432"
```

On

```
ports:
    - "54321:5432"

```


You can now  visit http://localhost:8000


## Authors

* [Dmitrii Grekov] (https://github.com/DmitriiGrekov)

