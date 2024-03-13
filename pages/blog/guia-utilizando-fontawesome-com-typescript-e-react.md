---
title: GUIA - Utilizando fontawesome com react e typescript
date: 2024-03-12
description: Neste artigo, irei descrever os passos para utilizar uma das bibiotecas de ícones mais legais...
tag: soft-skills
author: Jairo Tunisse
---

Neste artigo, irei descrever os passos para utilizar uma das bibiotecas de ícones mais legais em seu projeto react, a fontawesome. 

### Modo de usar

Para usar  o fontawesome é preciso seguir o seguinte passo 

1. Instalar o fontawsome em seu projeto react
2. Iniciar o fontawesome em seu arquivo .js ou .tsx
3. Usar o ícones

### Instalação 

Basta copiar os comandos a seguir para  instalar o fontawesome em seu projeto:

* Usando npm:

```bash 
npm i --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
npm install --save @fortawesome/free-brands-svg-icons
```

* Usando yarn: 

```bash 
yarn add @fortawesome/fontawesome-svg-core
yarn add @fortawesome/free-solid-svg-icons
yarn add @fortawesome/react-fontawesome
yarn add @fortawesome/free-brands-svg-icons
```

### Inicializando a biblioteca do fontawesome em seu projeto

A inicialização só será necessária  se você pretende utilizar o fontawesome de forma global em seu projeto (Ou se estiver utilizado typescript). Fora isso você poderá utilizar normalmente o fontawesome em apenas um componente ou mais. No próximo exemplo, irei inicializar alguns icones dentro do arquivo global para utilizar os ícones em toda a aplicação:

```js

import { faB, faCheckSquare, faCoffee, faDatabase, faHouseLaptop, faS, faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
library.add(faB, faS, faHouseLaptop, faCheckSquare, faCoffee, faDatabase, faWindowMaximize)

 ``` 
Com isso você poderá utilizar estes ícones importados em sua aplicação. 

### Como utilizar os ícones no componente react? 

Basta utilizar o componente da lib do fontawesome, o FontAwesomeIcon: 

```js
<FontAwesomeIcon icon ={["fas", "house-laptop"]} />
 ```

> Note que são utilizados duas strings no array, o fas que representa que o ícone será sólido e o nome do ícone

> Este exemplo foi adicionado com base na inicialização dos ícones, repare que inicializamos o icone como "faHouseLaptop" mas escrevemos ele no array  como "house-laptop" idem, importamos o fas como "faS"


Se você decidir importar o ícone na página onde está o componente você pode fazer desta forma: 
```js
<FontAwesomeIcon icon={faHouseLaptop} />
 ```

### Como adicionar um ícone utilizando typescript?

Após procurar o ícone desejado no [fontawesome](https://fontawesome.com/), e tentar utilizar o componente FontAwesomeIcon na aplicação, irá retornar um erro de tipagem, como no exemplo abaixo:

```js
<FontAwesomeIcon icon="fa-solid fa-align-right" />
 ```

Para importar corretamente o ícone no typescript, após inicia-lo em seu componente ou de forma global faça desta forma: 


```js 
import { faS, faAlignRight } from '@fortawesome/free-solid-svg-icons';
library.add(faS, faAlignRight)
```
depois basta chamar o ícone com o FontAwesomeIcon :

```js
<FontAwesomeIcon icon={["fas", "align-right"]} />
 ```

> Note que declaramos o ícone como "faAlignRight" mas chamamos como "align-right". Desta forma o typescript irá entender a tipagem do ícone no componente.


Uma Pequena Lista para que vocês possam ter uma colinha ao utilizar o tipo de ícone: 

- "fas" -> solid
- "far" -> regular
- "fal" -> light
- "fat" -> thin
- "fad" -> duotone
- "fab" -> brand

Espero ter ajudado e bora codar 🔥 💻