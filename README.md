# Reto Dev Junior Web Frontend

El siguiente proyecto es la solución del reto web frontend para dev junior hecho por Esteban Rosano, planteado para el Talent Zone.
Este proyecto trabaja en colaboracion con la solucion al reto backend.

### Documentación referenciada

Para conocer más sobre el proyecto, por favor considerar leer el documento propuesta:

- [Documento Reto Dev Junior Web Frontend](https://drive.google.com/file/d/1QdA93cuG74zft9LbCi9qVUYmH7IJ7YEB/view)

## Guia de ejecución

Para ejecutar correctamente la aplicacion en el ambiente local, debera levantar el backend primeramente.
Para eso, debera de contar con una instancia de mongodb en local funcionando en el puerto 27017, de lo contrario debera de modificar el archivo application.properties y cambiar la propiedad spring.data.mongodb.uri por la dirección de su instancia de mongodb.

Luego podra abrir una terminal en la raiz del proyecto y hacer

```bash
  npm run dev
```

>Debera de contar con las versiones de Node 14.20.0 y NPM 6.14.17 o superiores para ejecutar los comandos.