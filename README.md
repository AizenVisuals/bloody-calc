# Bloody Calc

Calculadora pessoal de Bloody: Crimson e Mono, cinco ícones selecionáveis, arco de luz, orçamentos e ferramentas para o trabalho criativo. Funciona offline. Sem conta, anúncios ou coleta de dados.

## Instalar no Android

### Pelo navegador (mais simples)

1. No repositório, entre em **Settings → Pages → Source → GitHub Actions**. Essa habilitação é feita uma vez pelo dono da conta.
2. Em **Actions → Web app**, clique em **Run workflow**. Espere o resultado verde.
3. Abra **https://aizenvisuals.github.io/bloody-calc/** no Chrome do celular.
4. No menu ⋮, escolha **Adicionar à tela inicial → Instalar**. Espere o primeiro carregamento completo com internet. Depois você pode usar offline.

### APK

1. Abra **Actions → Android APK** e confira que a execução terminou em verde. Se ainda não executou, use **Run workflow**.
2. Na página **Releases**, abra a build mais recente e baixe `Bloody-Calc.apk` em **Assets**.
3. No celular, abra o arquivo e autorize a instalação pelo navegador/gerenciador de arquivos quando o Android solicitar.
4. Abra **Bloody Calc**. O APK inclui o app inteiro; não precisa de internet.

O APK é uma **build de teste assinada com chave de depuração**, destinada ao uso pessoal. A chave é reaproveitada pelo cache do Actions, mas, se esse cache for removido, uma build posterior pode precisar de reinstalação. Exporte um backup antes de desinstalar ou limpar dados. Uma futura publicação na Play Store precisa de assinatura de produção própria.

## Funcionalidades

- Calculadora com precedência, parênteses, porcentagem contextual, raiz, potência, trigonometria em DEG/RAD, logaritmos, inverso e módulo.
- Aritmética racional exata; funções transcendentes e potências fracionárias usam aproximação identificada por `≈`. Histórico e rascunho persistidos.
- Orçamentos com serviços editáveis, favoritos, quantidade, desconto, entrada, acréscimos, custos, saldo e compartilhamento.
- Taxas diretas/inversas, margem/acréscimo, parcelas com juros simples/compostos e divisão que distribui centavos sem perder o total.
- Proporções de design, PPI/centímetros, durações, cronômetro persistente e cobrança por hora.
- Fórmulas pessoais com variáveis e um interpretador matemático restrito. Não usa `eval` nem `new Function`.
- Temas personalizados com cores, contraste de texto automático, arco, fundo próprio, teclas, tipografia, som/vibração/animações, duplicação por salvamento e importação/exportação.
- Backup local completo em JSON, com validação e confirmação antes de substituir dados.

Valores de serviços, tarifas e juros são configurados pelo usuário. Parcelamento composto significa capitalização sobre o principal por período, **não amortização Price**. A versão inicial limita expoentes inteiros a ±100. Backups até 5 MB. Até 20 temas salvos.

## Desenvolvimento

Nenhuma dependência JavaScript de produção ou ferramenta de build é necessária.

```sh
npm ci
npm test
npm start
```

Abra `http://localhost:8080`. Para Android, use Android Studio para abrir `android/`, ou Gradle 8.9 + JDK 17 + Android SDK 35:

```sh
cd android
gradle :app:assembleDebug
```

### Estrutura

- `web/engine.js`: matemática e ferramentas, testáveis sem DOM.
- `web/store.js`: armazenamento e validação de backup.
- `web/app.js`: telas e interações.
- `web/style.css`: interface responsiva e temas.
- `web/assets/wing.svg`: asa vetorial leve, adaptada para interface e recolorida pelo tema.
- `web/assets/wing-generated.png`: asa em imagem com transparência, produzida separadamente como referência de marca.
- `android/`: invólucro Android local com WebViewAssetLoader, copiar, compartilhar e salvar backup nativos.
- `.github/workflows/`: testes, APK e deploy opcional do PWA.

## Privacidade e atualização

O APK não solicita permissão de internet. O PWA faz requisições apenas para carregar seus próprios arquivos. Dados ficam no armazenamento local do app/navegador; não são enviados ao GitHub. PWA e APK têm bancos locais separados: use backup para migrar. Dados locais não são criptografados por este aplicativo.

Ao alterar o app web, mude o nome `CACHE` em `web/sw.js` para atualizar os arquivos offline. Teste antes de distribuir. Não envie backups reais com dados pessoais para o repositório.

## Verificação

Execute `npm test` para verificar matemática e validação de backup. A compilação Android é validada no GitHub Actions, não por um SDK local incluído neste repositório. Testes de interface e comportamento no WebView do aparelho complementam esses testes.

## Ícones e tela de abertura (v1.1)

Em **Aparência → Ícone do aplicativo**, escolha Asa vermelha, Asa branca, Selo, Monograma B ou Eclipse. No APK, cinco `activity-alias` alternam o ícone do launcher. Alguns launchers levam alguns segundos para atualizar, e a posição do atalho pode mudar. No Android 13+, a alteração usa uma atualização atômica dos componentes. Em versões anteriores, o novo atalho é habilitado antes de desabilitar os demais.

No PWA, o app seleciona o manifesto da opção escolhida; o navegador pode manter o ícone anterior até remover e reinstalar o app. Exporte um backup antes desse procedimento e restaure depois, caso o navegador descarte os dados. Não existe garantia de troca imediata do ícone externo no PWA.

As imagens originais e as versões de instalação ficam em `web/assets/icons/`. A splash screen está em `web/assets/splash.png`, pronta para enviar ao construtor de apps. É uma tela de abertura; o Android 12+ também mostra sua própria splash de sistema baseada no ícone. A imagem do app desaparece quando a interface está pronta, sem espera artificial.

A troca nativa ainda precisa ser validada em um APK compilado e no launcher do aparelho. Os testes automatizados verificam a escolha na interface, a persistência e o manifesto web.
