# Halo Calc

Criei o Halo Calc porque queria uma calculadora que fosse agradável de usar e tivesse uma identidade própria. O arco luminoso virou o centro do visual, e o resto foi pensado para deixar a conta em primeiro lugar.

A abertura acompanha o tema salvo e permanece visível por pelo menos 1 segundo após ser desenhada.

O app é gratuito, funciona offline e não tem anúncios nem cadastro. É um projeto da **Aizen Visuals**.

## Instalar no Android

1. Abra [Releases](https://github.com/AizenVisuals/bloody-calc/releases).
2. Baixe `Halo-Calc.apk` na versão mais recente.
3. Abra o arquivo no celular e permita a instalação pelo navegador ou gerenciador de arquivos quando o Android pedir.

Esta versão é de teste, distribuída diretamente pelo GitHub. Ainda não publiquei na Play Store. Para atualizar, instale o novo APK por cima do anterior quando a assinatura for a mesma. Os builds até o 6 foram gerados com chaves diferentes por uma falha no cache: para migrar dessas versões, exporte um backup nos ajustes, reinstale e restaure o backup.

## O que tem no app

- Calculadora com porcentagem, parênteses e resultado em tempo real.
- Painel científico separado, com potência, raiz, funções trigonométricas e ângulos em graus ou radianos.
- Histórico com busca, favoritos e reutilização de contas.
- Toque curto em apagar remove um caractere; segurar por 1,5 segundo limpa a expressão.
- Cronômetro com pausa, retomada e até 100 voltas. O tempo continua ao sair e voltar ao app.
- Nove temas, incluindo opções claras em ciano, rosa pastel, bege e lavanda, além do Graphite fosco. A seleção fica em Ajustes → Temas, com prévia.
- Três tamanhos de texto, som dos botões e vibração opcional.
- Nove ícones Halo para a tela inicial, escolhidos em Ajustes → Ícones sem alterar o tema.
- Backup e restauração em JSON.

A tela da calculadora se ajusta à altura disponível, sem precisar rolar para encontrar os últimos botões. Em telas horizontais baixas, visor e teclado ficam lado a lado. Histórico e ajustes têm rolagem própria.

## Privacidade

As contas, voltas e preferências ficam no aparelho. Não tenho um servidor recebendo esses dados. O APK não pede permissão de internet; a versão web usa conexão apenas para carregar seus próprios arquivos e poder funcionar offline depois.

Os dados locais não são criptografados pelo app. Desinstalar ou limpar os dados pode apagar seu histórico, por isso deixei a opção de backup. O navegador e o APK usam armazenamentos separados: para migrar, exporte em um e restaure no outro.

## Rodar o projeto

Use Node.js 22 e Python 3:

```sh
npm ci
npm test
npm start
```

Abra `http://localhost:8080`.

Para compilar o Android, abra a pasta `android/` no Android Studio ou use JDK 17, Gradle 8.9 e Android SDK 35:

```sh
cd android
gradle :app:assembleDebug
```

O GitHub Actions testa o código, compila o APK e publica o arquivo em Releases. Mantive o identificador Android e a chave de armazenamento da primeira versão, chamada Bloody Calc, para permitir atualização sem perder os dados.

## Versão web

O projeto também inclui um PWA. Para publicar pelo GitHub Pages, configure **Settings → Pages → Source → GitHub Actions** e execute o workflow **Web app**. Depois do primeiro carregamento completo, ele pode ser instalado pelo navegador e usado offline.

## Detalhes que vale saber

- Funções transcendentes e divisões periódicas podem gerar aproximações, sinalizadas com `≈`.
- No Android, alguns launchers demoram para mostrar um ícone novo. No PWA, pode ser necessário reinstalar o atalho.
- O cronômetro mede tempo pelo relógio do aparelho; mudanças manuais nesse relógio podem afetar uma contagem em andamento.
- O APK atual usa assinatura de depuração para testes. O workflow reaproveita a chave em cache; perder esse cache pode exigir reinstalação. Uma publicação na loja terá assinatura de produção própria.
- O nome público é Halo Calc; o endereço do repositório ainda conserva o nome inicial.

## Desenvolvimento

A interface está em `web/`, o interpretador matemático em `web/engine.js` e o invólucro Android em `android/`. Não há dependências JavaScript de produção.

Estou refinando o projeto com testes automatizados e testes no celular. Compilar sem erros não substitui verificar o comportamento no aparelho.

**Aizen Visuals**

## Arquivos dos ícones

As nove variantes Halo usadas pelo app estão em `web/assets/icons/`, em 192 e 512 px, e no Android em 512 px. Os arquivos `halo-*-source.png` da transferência anterior estavam truncados e foram retirados; os originais de alta resolução ainda não foram recuperados. As imagens usadas na interface e na instalação foram preservadas e têm verificação automatizada de integridade.
