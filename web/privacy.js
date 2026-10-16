import {locale,t} from "./i18n.js";
export const supportUrl="aizenvisuals.apps@gmail.com";
export const policies={
  "pt": {
    "title": "Privacidade",
    "updated": "Atualizada em 16/10/2026",
    "intro": "Halo Calc é desenvolvido por Aizen Visuals. Esta política descreve o app Android e a versão web.",
    "sections": [
      [
        "Dados no seu aparelho",
        "Contas, histórico, favoritos, voltas do cronômetro e preferências ficam no armazenamento local do app ou navegador. Não são enviados a um servidor da Aizen Visuals. Não há cadastro, anúncios nem ferramentas de análise ou rastreamento no app."
      ],
      [
        "Permissões e funcionamento offline",
        "O APK não solicita permissão de internet. A vibração é opcional e usada apenas nos botões. Você escolhe os arquivos de backup pelo seletor do Android; o app não pede acesso geral aos seus arquivos. A cópia automática do Android está desativada; políticas de transferência entre aparelhos podem variar conforme o fabricante."
      ],
      [
        "Backup, exclusão e segurança",
        "Exportar cria um arquivo JSON legível e não criptografado no local que você escolher. Compartilhe esse arquivo apenas se desejar e guarde-o com cuidado. Limpar os dados do app/navegador ou desinstalar remove o armazenamento local; arquivos que você exportou precisam ser apagados separadamente. Não há servidor do desenvolvedor do qual solicitar exclusão."
      ],
      [
        "Versão web e serviços externos",
        "Na primeira visita, o navegador baixa os arquivos do site hospedado no GitHub Pages e pode guardá-los em cache para uso offline. O provedor de hospedagem pode processar dados técnicos da conexão, como endereço IP, conforme suas próprias políticas. O histórico de cálculos não é transmitido pelo código do Halo. Ao entrar em serviços externos por conta própria, valem as políticas deles."
      ],
      [
        "Contato e alterações",
        "Para dúvidas sobre privacidade ou suporte, escreva para aizenvisuals.apps@gmail.com. Não publique seu histórico de cálculos, backups ou dados pessoais em relatos públicos. Mudanças relevantes no tratamento de dados serão refletidas nesta política."
      ]
    ]
  },
  "en": {
    "title": "Privacy",
    "updated": "Updated October 16, 2026",
    "intro": "Halo Calc is developed by Aizen Visuals. This policy covers the Android app and web version.",
    "sections": [
      [
        "Data on your device",
        "Calculations, history, favorites, stopwatch laps and preferences stay in local app or browser storage. They are not sent to an Aizen Visuals server. The app has no account registration, advertising, analytics or tracking tools."
      ],
      [
        "Permissions and offline use",
        "The APK does not request internet permission. Optional vibration is used only for buttons. You select backup files through the Android file picker; the app does not request broad file access. Android automatic backup is disabled; device-transfer behavior may vary by manufacturer."
      ],
      [
        "Backup, deletion and security",
        "Export creates a readable, unencrypted JSON file in the location you choose. Share it only if you want to and store it carefully. Clearing app/browser data or uninstalling removes local storage; exported files must be deleted separately. There is no developer server from which to request deletion."
      ],
      [
        "Web version and external services",
        "On the first visit, your browser downloads the site files hosted on GitHub Pages and may cache them for offline use. The hosting provider may process connection information such as your IP address under its own policies. Halo code does not transmit calculation history. External services you visit are governed by their own policies."
      ],
      [
        "Contact and changes",
        "For privacy questions or support, email aizenvisuals.apps@gmail.com. Do not post calculation history, backups or personal information in public reports. Material changes to data handling will be reflected in this policy."
      ]
    ]
  },
  "es": {
    "title": "Privacidad",
    "updated": "Actualizada el 16/10/2026",
    "intro": "Halo Calc es desarrollado por Aizen Visuals. Esta política describe la aplicación Android y la versión web.",
    "sections": [
      [
        "Datos en tu dispositivo",
        "Los cálculos, historial, favoritos, vueltas del cronómetro y preferencias permanecen en el almacenamiento local de la app o del navegador. No se envían a un servidor de Aizen Visuals. La app no tiene registro de cuentas, anuncios, analítica ni herramientas de seguimiento."
      ],
      [
        "Permisos y uso sin conexión",
        "El APK no solicita permiso de internet. La vibración es opcional y solo se usa en los botones. Tú seleccionas los archivos de copia de seguridad mediante el selector de Android; la app no pide acceso general a tus archivos. La copia automática de Android está desactivada; la transferencia entre dispositivos puede variar según el fabricante."
      ],
      [
        "Copia de seguridad, eliminación y seguridad",
        "La exportación crea un archivo JSON legible y sin cifrar en la ubicación que elijas. Compártelo solo si quieres y guárdalo con cuidado. Borrar los datos de la app/navegador o desinstalar elimina el almacenamiento local; los archivos exportados deben borrarse por separado. No hay servidor del desarrollador al que solicitar eliminación."
      ],
      [
        "Versión web y servicios externos",
        "En la primera visita, el navegador descarga los archivos alojados en GitHub Pages y puede almacenarlos para usarlos sin conexión. El proveedor de alojamiento puede procesar datos de conexión, como tu dirección IP, según sus propias políticas. El código de Halo no transmite el historial de cálculos. Los servicios externos que visites se rigen por sus propias políticas."
      ],
      [
        "Contacto y cambios",
        "Para preguntas sobre privacidad o soporte, escribe a aizenvisuals.apps@gmail.com. No publiques tu historial, copias de seguridad ni datos personales en informes públicos. Los cambios relevantes en el tratamiento de datos se reflejarán en esta política."
      ]
    ]
  }
};
export function privacyView(){const p=policies[locale().split('-')[0]]||policies.pt;return `<section class="page privacy"><button class="secondary" data-act="themes">${t('← Ajustes')}</button><h1>${p.title}</h1><p class="muted">${p.updated}</p><p>${p.intro}</p>${p.sections.map(([heading,body])=>`<h2>${heading}</h2><p>${body}</p>`).join('')}<p>Aizen Visuals · Halo Calc</p><p>${supportUrl}</p><button class="secondary" data-act="support">${locale().startsWith('en')?'Copy support email':locale().startsWith('es')?'Copiar correo de soporte':'Copiar e-mail de suporte'}</button></section>`}
