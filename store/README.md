# Materiais da Play Store

- listing-pt-BR.json, listing-en-US.json e listing-es-ES.json: títulos, descrições e contato de suporte. Limites de 80/4.000 caracteres verificados.
- assets/play-icon-512.png: ícone 512×512.
- assets/feature-*.png: imagens de destaque 1024×500; SVGs editáveis correspondentes incluídos.
- upload-certificate.pem: certificado público da chave de upload; não contém chave privada.

Ainda faltam capturas reais da versão final no celular, a seleção de público/classificação pelo proprietário, preenchimento dos formulários e teste fechado exigido pelo Console. Não inventar capturas nem marcar aprovação. O motion de 16s já existente é material promocional, não prova de funcionamento da versão atual.

Suporte público: aizenvisuals.apps@gmail.com. URLs de privacidade estão nos arquivos JSON. O pacote AAB é gerado pelo workflow manual Play Store candidate e não é enviado automaticamente ao Google. O número de versão de cada upload deve ser único e crescente. A chave de upload é separada da chave dos APKs de teste do GitHub; a migração entre instalações de teste e Play precisa ser planejada ao configurar Play App Signing.
