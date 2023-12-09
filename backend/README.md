## Demo-project

App to test Spring Security using google oauth2 using GraalVM.

To create native images with SpringBoot we need to use spring 3.x and Java 17.

To run the database in dev 

```
docker run -p 13306:3306 --name mysql-docker-local -eMYSQL_ROOT_PASSWORD=Password -d mysql:latest
```

Tutorial that I'm following about GraalVM (https://docs.spring.io/spring-boot/docs/current/reference/html/native-image.html).

### To build a GraalVM native application (Without docker)
This will create in /target the binary native file demo-project that you can execute.
```
mvn -Pnative native:compile
```

### Swagger documentation
To check the swagger documentation enter to http://localhost:8080/swagger-ui.html

