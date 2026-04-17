---
title: 'Guia de estilo Markdown'
description: 'Exemplos básicos de sintaxe Markdown para conteúdo no Astro.'
pubDate: 'Jun 19 2024'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

A seguir, exemplos de sintaxe Markdown úteis ao escrever conteúdo no Astro.

## Títulos

Os elementos HTML `<h1>` a `<h6>` representam seis níveis de título. `<h1>` é o nível mais alto e `<h6>` o mais baixo.

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Parágrafo

Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.

Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.

## Imagens

### Sintaxe

```markdown
![Texto alternativo](./caminho/completo/ou/relativo/da/imagem)
```

### Resultado

![blog placeholder](../../assets/blog-placeholder-about.jpg)

## Citações

O elemento `blockquote` representa conteúdo citado de outra fonte, opcionalmente com atribuição em `footer` ou `cite`, e alterações em linha como anotações e abreviações.

### Citação sem atribuição

#### Sintaxe

```markdown
> Tiam, ad mint andaepu dandae nostion secatur sequo quae.  
> **Observe** que você pode usar _sintaxe Markdown_ dentro da citação.
```

#### Resultado

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.  
> **Observe** que você pode usar _sintaxe Markdown_ dentro da citação.

### Citação com atribuição

#### Sintaxe

```markdown
> Não se comunique compartilhando memória; compartilhe memória se comunicando.<br>
> — <cite>Rob Pike[^1]</cite>
```

#### Resultado

> Não se comunique compartilhando memória; compartilhe memória se comunicando.<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: Trecho da [palestra](https://www.youtube.com/watch?v=PAAkCSZUG1c) de Rob Pike no Gopherfest, 18 de novembro de 2015.

## Tabelas

### Sintaxe

```markdown
| Itálico   | Negrito  | Código |
| --------- | -------- | ------ |
| _itálico_ | **negrito** | `code` |
```

### Resultado

| Itálico   | Negrito  | Código |
| --------- | -------- | ------ |
| _itálico_ | **negrito** | `code` |

## Blocos de código

### Sintaxe

Use três crases em uma linha, o trecho e feche com três crases. Para realce de sintaxe, coloque o nome do idioma após as primeiras três crases (por exemplo `html`, `javascript`, `css`, `markdown`, `typescript`, `txt`, `bash`).

````markdown
```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Documento HTML5 de exemplo</title>
  </head>
  <body>
    <p>Teste</p>
  </body>
</html>
```
````

### Resultado

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Documento HTML5 de exemplo</title>
  </head>
  <body>
    <p>Teste</p>
  </body>
</html>
```

## Tipos de lista

### Lista ordenada

#### Sintaxe

```markdown
1. Primeiro item
2. Segundo item
3. Terceiro item
```

#### Resultado

1. Primeiro item
2. Segundo item
3. Terceiro item

### Lista não ordenada

#### Sintaxe

```markdown
- Item
- Outro item
- Mais um item
```

#### Resultado

- Item
- Outro item
- Mais um item

### Lista aninhada

#### Sintaxe

```markdown
- Frutas
  - Maçã
  - Laranja
  - Banana
- Laticínios
  - Leite
  - Queijo
```

#### Resultado

- Frutas
  - Maçã
  - Laranja
  - Banana
- Laticínios
  - Leite
  - Queijo

## Outros elementos — abbr, sub, sup, kbd, mark

### Sintaxe

```markdown
<abbr title="Graphics Interchange Format">GIF</abbr> é um formato de imagem raster.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Pressione <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> para encerrar a sessão.

A maioria dos <mark>salamandros</mark> é noturna e caça insetos, minhocas e outros pequenos animais.
```

### Resultado

<abbr title="Graphics Interchange Format">GIF</abbr> é um formato de imagem raster.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Pressione <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> para encerrar a sessão.

A maioria dos <mark>salamandros</mark> é noturna e caça insetos, minhocas e outros pequenos animais.
