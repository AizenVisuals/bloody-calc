# Halo Calc — preparação para Google Play

Auditoria em 16/10/2026. Este documento descreve pendências; não confirma aprovação nem publicação na loja.

## Atualizações dos APKs já distribuídos

A identidade de assinatura dos builds 7 a 11 foi preservada. O segredo `HALO_EXISTING_KEYSTORE_BASE64` guarda a chave privada na infraestrutura de secrets do repositório; o certificado esperado é conferido antes de compilar. Não há geração automática de uma chave substituta. O cache da chave foi removido. O procedimento temporário de recuperação foi retirado, e seu artefato remoto criptografado foi apagado após a cópia local e a gravação dos secrets.

A cópia local protegida fica fora deste repositório, em diretório do proprietário. Não enviar essa pasta para o GitHub, anexar ao suporte ou publicar. A chave privada não pode aparecer em código ou logs. Certificados públicos e suas impressões digitais não são segredos. Uma cópia de segurança independente e protegida deve ser mantida pelo proprietário.

Os builds até o 6 tiveram assinaturas diferentes; esta correção não consegue torná-los retroativamente compatíveis. A assinatura preservada ainda é de depuração, portanto não é a identidade de produção para Google Play. A passagem dos testes para produção deve ser planejada antes do lançamento, sem prometer atualização direta entre certificados diferentes.

## Pendências para publicar

1. Conta Play Console: escolher conta pessoal ou organização, verificar identidade e contato, aceitar os termos e pagar a taxa única de US$ 25. Novas contas pessoais também precisam verificar acesso a um aparelho Android pelo app Play Console. Estas ações são do proprietário; nenhuma conta foi criada e nenhum pagamento foi realizado.
2. Implementado: compileSdk/targetSdk 36, AGP 8.10.1 e Gradle 8.11.1 no CI. A regra vigente desde 31/08/2026 exige API 36 para novos apps e atualizações de apps Android de celular. Rever compatibilidade, layout com barras do sistema e navegação em Android 16. Não basta mudar o número e presumir compatibilidade.
3. Implementado: build release não depurável, Android App Bundle (.aab), chave de upload separada e protegida em secrets, certificado público em store/upload-certificate.pem e workflow manual Play Store candidate. Ainda falta configurar Play App Signing no Console. Não trocar a identidade dos APKs de teste silenciosamente. A chave de teste atual não deve ser apresentada como pronta para a loja.
4. Implementado: política nos três idiomas, pública em privacy.html / privacy-en.html / privacy-es.html e acessível nos ajustes, com aizenvisuals.apps@gmail.com. Ainda falta preencher Segurança dos dados no Console. O código atual não solicita INTERNET e não tem cadastro/anúncios/analytics próprios; confirmar dependências e comportamento do backup do Android antes de preencher declarações. Apps sem coleta também precisam de formulário e política.
5. Preparado em store/: nome, descrições curta e completa em três idiomas, categoria sugerida Ferramentas, email de suporte, ícone 512×512 e imagens de destaque 1024×500 em três idiomas. Capturas reais ainda pendentes. O motion existente pode ajudar na divulgação; não substitui capturas e outros materiais exigidos.
6. Formulários: acesso ao app (sem login), presença de anúncios (atualmente não), classificação de conteúdo, público-alvo e demais declarações aplicáveis mostradas no Console. Plus fica fora desta etapa.
7. Testes reais: atualizações sem desinstalar, conservação de histórico/preferências, três idiomas, vírgula/ponto, acessibilidade, diferentes alturas de tela, cronômetro em segundo plano e troca de ícones. Os testes automatizados e a compilação não substituem validação no celular.
8. Para contas pessoais criadas após 13/11/2023: teste fechado com pelo menos 12 participantes inscritos continuamente durante 14 dias e posterior solicitação de acesso à produção. Distribuir APKs a 20 pessoas informalmente não substitui essa exigência.

## Anúncio do AI Studio em 13/10/2026

A fonte oficial confirma que apps pessoais criados no Google AI Studio podem ser executados privadamente no próprio aparelho via Google Play, usando conta Google comum, sem conta de desenvolvedor. O início é para maiores de 18 anos em mercados selecionados, incluindo EUA. O texto não confirma Brasil. O compartilhamento com amigos/familiares é anunciado para os próximos meses. Publicar para o público continua exigindo conta de desenvolvedor e revisão. O anúncio não confirma um mecanismo para enviar este APK/AAB existente sem esses requisitos.

## Fontes oficiais consultadas

- https://developer.android.com/studio/publish/app-signing
- https://developer.android.com/google/play/requirements/target-sdk
- https://support.google.com/googleplay/android-developer/answer/6112435?hl=en
- https://support.google.com/googleplay/android-developer/answer/14151465?hl=en
- https://support.google.com/googleplay/android-developer/answer/10787469?hl=en
- https://support.google.com/googleplay/android-developer/answer/10144311?hl=en
- https://support.google.com/googleplay/android-developer/answer/9866151?hl=en
- https://blog.google/products-and-platforms/platforms/google-play/google-play-updates-october-2026/


## Verificação técnica desta preparação

- AAB release local validado pelo bundletool 1.18.3: applicationId dev.bloody.calc, targetSdk 36, não depurável, sem INTERNET, sem bibliotecas nativas, assinado pela chave de upload de produção. Versão candidata 2.1.0 / código 1000.
- Navegação Voltar migrou para OnBackInvokedCallback em Android 13+, com fallback nas versões anteriores. Insets incluem barras, recortes e teclado em API 30+.
- Nove ícones adaptativos mantêm as nove artes e aliases anteriores. Regras explícitas excluem dados de cópia automática e transferência Android 12+.
- Lint release: zero erros; avisos remanescentes incluem bibliotecas não atualizadas, JavaScript necessário para conteúdo local, atributos ignorados em APIs antigas, recursos antigos preservados e ícone monocromático opcional. Sem baseline para ocultar erros.
- 24 testes JavaScript passaram, incluindo privacidade nos três idiomas e navegação de retorno.
- Não há aparelho Android conectado nem imagem de emulador instalada: navegação nativa, barras, teclado, instalação e uso reais na API36 ainda não foram validados.
- Conta Play Console, verificação de identidade/aparelho, taxa, formulários, Play App Signing, teste fechado e aprovação continuam dependentes do proprietário/Google. Nenhum pagamento, aceite de termos ou publicação no Console foi feito.

Avaliação: candidato para testes internos/fechados, não lançamento público confirmado. Vale testar a proposta visual e personalização com usuários reais antes de investir na publicação pública. Plus permanece fora do produto.
