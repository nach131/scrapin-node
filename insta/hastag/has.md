Para etiquetar a un usuario en el post de otro usuario utilizando Node.js y la biblioteca `instagram-private-api`, debes seguir los siguientes pasos:

1. Autenticarte en Instagram:

```js
const { IgApiClient } = require('instagram-private-api');

const ig = new IgApiClient();
ig.state.generateDevice('username');
await ig.account.login('username', 'password');
```

2. Obtener el objeto `MediaEntity` del post donde deseas etiquetar al usuario:

```js
const mediaEntity = await ig.media.info(mediaId);
```

3. Crear una etiqueta (`TagEntity`) para el usuario que deseas etiquetar en el post:

```js
const tag = await ig.tag.create({
  name: 'nombre_del_usuario',
  x: 0.5,
  y: 0.5,
  width: 0.1,
  height: 0.1,
});
```

Los valores `x`, `y`, `width` y `height` indican la posición y tamaño de la etiqueta en la imagen, como un porcentaje del ancho y alto de la imagen. En este ejemplo, la etiqueta se posiciona en el centro de la imagen y tiene un tamaño del 10% del ancho y alto de la imagen.

4. Agregar la etiqueta al post utilizando el método `editMedia`:

```js
await ig.media.editMedia({
  mediaId: mediaId,
  extra: {
    source_width: mediaEntity.extra.source_width,
    source_height: mediaEntity.extra.source_height,
    camera_position: 'back',
    tagged_users: [
      {
        user_id: userId,
        position: [tag.x, tag.y],
        width: tag.width,
        height: tag.height,
      },
    ],
  },
});
```

En este ejemplo, `userId` es el ID del usuario que deseas etiquetar en el post.

Es importante tener en cuenta que solo puedes etiquetar usuarios que sigues y que tienen una cuenta pública. Además, la cuenta desde la que realizas la etiqueta debe seguir al usuario etiquetado.