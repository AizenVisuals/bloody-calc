// UI translations are independent from stored mathematical expressions and theme identities.
export const languages=['pt','en','es'];
const locales={pt:'pt-BR',en:'en-US',es:'es-ES'};
let language='pt';
export function resolveLanguage(choice='auto',device=globalThis.navigator?.languages?.[0]||globalThis.navigator?.language||'pt'){return languages.includes(choice)?choice:(languages.includes(device.split('-')[0].toLowerCase())?device.split('-')[0].toLowerCase():'pt')}
export function setLanguage(choice,device){language=resolveLanguage(choice,device);return language}
export const locale=()=>locales[language];
export const decimal=()=>language==='en'?'.':',';
const messages={
  "Calculadora": [
    "Calculator",
    "Calculadora"
  ],
  "Cronômetro": [
    "Stopwatch",
    "Cronómetro"
  ],
  "Histórico": [
    "History",
    "Historial"
  ],
  "Aparência e ajustes": [
    "Appearance and settings",
    "Apariencia y ajustes"
  ],
  "Seções": [
    "Sections",
    "Secciones"
  ],
  "SEU PRÓXIMO RESULTADO": [
    "YOUR NEXT RESULT",
    "TU PRÓXIMO RESULTADO"
  ],
  "Expressão matemática": [
    "Mathematical expression",
    "Expresión matemática"
  ],
  "Apagar caractere; segure 1,5 segundo para limpar": [
    "Delete character; hold 1.5 seconds to clear",
    "Borrar carácter; mantén 1,5 segundos para limpiar"
  ],
  "Copiar resultado": [
    "Copy result",
    "Copiar resultado"
  ],
  "Toque no resultado para copiar": [
    "Tap the result to copy",
    "Toca el resultado para copiar"
  ],
  "Resultado aproximado · toque para copiar": [
    "Approximate result · tap to copy",
    "Resultado aproximado · toca para copiar"
  ],
  "Revise a expressão": [
    "Review the expression",
    "Revisa la expresión"
  ],
  "Complete a expressão": [
    "Complete the expression",
    "Completa la expresión"
  ],
  "Científica": [
    "Scientific",
    "Científica"
  ],
  "Salvar conta": [
    "Save calculation",
    "Guardar cálculo"
  ],
  "Limpar tudo": [
    "Clear all",
    "Borrar todo"
  ],
  "Inverter sinal": [
    "Change sign",
    "Cambiar signo"
  ],
  "Dividir": [
    "Divide",
    "Dividir"
  ],
  "Multiplicar": [
    "Multiply",
    "Multiplicar"
  ],
  "Subtrair": [
    "Subtract",
    "Restar"
  ],
  "Somar": [
    "Add",
    "Sumar"
  ],
  "Vírgula decimal": [
    "Decimal separator",
    "Separador decimal"
  ],
  "Calcular": [
    "Calculate",
    "Calcular"
  ],
  "POR AIZEN VISUALS · OFFLINE": [
    "BY AIZEN VISUALS · OFFLINE",
    "POR AIZEN VISUALS · SIN CONEXIÓN"
  ],
  "POR AIZEN VISUALS": [
    "BY AIZEN VISUALS",
    "POR AIZEN VISUALS"
  ],
  "Fechar científica": [
    "Close scientific calculator",
    "Cerrar científica"
  ],
  "Insira a função e complete os parênteses na calculadora.": [
    "Insert the function and complete the parentheses in the calculator.",
    "Introduce la función y completa los paréntesis en la calculadora."
  ],
  "Voltar à conta": [
    "Back to calculation",
    "Volver al cálculo"
  ],
  "Ângulos:": [
    "Angles:",
    "Ángulos:"
  ],
  "Volta": [
    "Lap",
    "Vuelta"
  ],
  "Voltas": [
    "Laps",
    "Vueltas"
  ],
  "Inicie e toque em Volta para marcar intervalos.": [
    "Start and tap Lap to record intervals.",
    "Inicia y toca Vuelta para registrar intervalos."
  ],
  "CADA INSTANTE CONTA": [
    "EVERY MOMENT COUNTS",
    "CADA INSTANTE CUENTA"
  ],
  "Tempo decorrido": [
    "Elapsed time",
    "Tiempo transcurrido"
  ],
  "Em andamento": [
    "Running",
    "En marcha"
  ],
  "Pausado": [
    "Paused",
    "En pausa"
  ],
  "Pronto para começar": [
    "Ready to start",
    "Listo para empezar"
  ],
  "Zerar": [
    "Reset",
    "Reiniciar"
  ],
  "Pausar": [
    "Pause",
    "Pausar"
  ],
  "Retomar": [
    "Resume",
    "Continuar"
  ],
  "Iniciar": [
    "Start",
    "Iniciar"
  ],
  "O tempo continua ao trocar de tela ou sair do app. Pausar e zerar ficam sob seu controle.": [
    "Time keeps running when you switch screens or leave the app. You control pausing and resetting.",
    "El tiempo continúa al cambiar de pantalla o salir de la app. Tú decides cuándo pausar y reiniciar."
  ],
  "Limpar": [
    "Clear",
    "Borrar"
  ],
  "Buscar contas": [
    "Search calculations",
    "Buscar cálculos"
  ],
  "Expressão ou resultado": [
    "Expression or result",
    "Expresión o resultado"
  ],
  "Suas contas salvas aparecem aqui.": [
    "Your saved calculations appear here.",
    "Tus cálculos guardados aparecen aquí."
  ],
  "Favoritar conta": [
    "Favorite calculation",
    "Marcar cálculo como favorito"
  ],
  "Desfavoritar conta": [
    "Unfavorite calculation",
    "Quitar cálculo de favoritos"
  ],
  "Ajustes": [
    "Settings",
    "Ajustes"
  ],
  "← Ajustes": [
    "← Settings",
    "← Ajustes"
  ],
  "Deixe o Halo do seu jeito.": [
    "Make Halo your own.",
    "Haz que Halo sea tuyo."
  ],
  "Temas": [
    "Themes",
    "Temas"
  ],
  "Conforto": [
    "Comfort",
    "Comodidad"
  ],
  "Tamanho do texto": [
    "Text size",
    "Tamaño del texto"
  ],
  "Pequeno": [
    "Small",
    "Pequeño"
  ],
  "Médio": [
    "Medium",
    "Mediano"
  ],
  "Grande": [
    "Large",
    "Grande"
  ],
  "Som dos botões": [
    "Button sounds",
    "Sonido de los botones"
  ],
  "Vibração": [
    "Vibration",
    "Vibración"
  ],
  "Animações": [
    "Animations",
    "Animaciones"
  ],
  "Ícone do aplicativo": [
    "App icon",
    "Icono de la aplicación"
  ],
  "9 opções · independente do tema": [
    "9 options · independent of theme",
    "9 opciones · independiente del tema"
  ],
  "Seus dados": [
    "Your data",
    "Tus datos"
  ],
  "Contas e preferências ficam neste aparelho. Exporte antes de desinstalar.": [
    "Calculations and preferences stay on this device. Export before uninstalling.",
    "Los cálculos y preferencias se guardan en este dispositivo. Exporta antes de desinstalar."
  ],
  "Exportar backup": [
    "Export backup",
    "Exportar copia de seguridad"
  ],
  "Restaurar backup": [
    "Restore backup",
    "Restaurar copia de seguridad"
  ],
  "Calculadora e cronômetro por Aizen Visuals.": [
    "Calculator and stopwatch by Aizen Visuals.",
    "Calculadora y cronómetro de Aizen Visuals."
  ],
  "Gratuito · offline · sem anúncios": [
    "Free · offline · no ads",
    "Gratis · sin conexión · sin anuncios"
  ],
  "Escolha uma atmosfera. A prévia acompanha a seleção.": [
    "Choose an atmosphere. The preview follows your selection.",
    "Elige un ambiente. La vista previa sigue tu selección."
  ],
  "Ícones": [
    "Icons",
    "Iconos"
  ],
  "Escolha seu Halo. O tema da calculadora permanece como está.": [
    "Choose your Halo. Your calculator theme stays the same.",
    "Elige tu Halo. El tema de la calculadora se mantiene."
  ],
  "No Android, o ícone pode levar alguns segundos para atualizar. No navegador, pode ser necessário reinstalar o atalho.": [
    "On Android, the icon may take a few seconds to update. In the browser, you may need to reinstall the shortcut.",
    "En Android, el icono puede tardar unos segundos en actualizarse. En el navegador, puede ser necesario reinstalar el acceso directo."
  ],
  "Expressão apagada.": [
    "Expression cleared.",
    "Expresión borrada."
  ],
  "Armazenamento cheio. Exporte um backup.": [
    "Storage is full. Export a backup.",
    "Almacenamiento lleno. Exporta una copia de seguridad."
  ],
  "Copiado.": [
    "Copied.",
    "Copiado."
  ],
  "Não foi possível copiar neste navegador.": [
    "Could not copy in this browser.",
    "No se pudo copiar en este navegador."
  ],
  "Conta salva.": [
    "Calculation saved.",
    "Cálculo guardado."
  ],
  "Limite de 100 voltas.": [
    "Limit of 100 laps.",
    "Límite de 100 vueltas."
  ],
  "Zerar o cronômetro e as voltas?": [
    "Reset the stopwatch and laps?",
    "¿Reiniciar el cronómetro y las vueltas?"
  ],
  "Apagar todas as contas do histórico?": [
    "Delete all calculations from history?",
    "¿Borrar todos los cálculos del historial?"
  ],
  "Não foi possível trocar o ícone.": [
    "Could not change the icon.",
    "No se pudo cambiar el icono."
  ],
  "Ícone selecionado.": [
    "Icon selected.",
    "Icono seleccionado."
  ],
  "Use um backup de até 5 MB.": [
    "Use a backup up to 5 MB.",
    "Usa una copia de seguridad de hasta 5 MB."
  ],
  "Substituir os dados atuais por este backup?": [
    "Replace current data with this backup?",
    "¿Reemplazar los datos actuales con esta copia de seguridad?"
  ],
  "Backup restaurado.": [
    "Backup restored.",
    "Copia de seguridad restaurada."
  ],
  "Abrindo Halo Calc": [
    "Opening Halo Calc",
    "Abriendo Halo Calc"
  ],
  "Idioma": [
    "Language",
    "Idioma"
  ],
  "Automático (celular)": [
    "Automatic (device)",
    "Automático (dispositivo)"
  ],
  "Uma calculadora que combina com o seu celular.": [
    "A calculator that matches your phone.",
    "Una calculadora que combina con tu móvil."
  ],
  "Não é possível dividir por zero.": [
    "Cannot divide by zero.",
    "No se puede dividir entre cero."
  ],
  "Informe um número válido.": [
    "Enter a valid number.",
    "Introduce un número válido."
  ],
  "Use expoente entre −100 e 100.": [
    "Use an exponent between −100 and 100.",
    "Usa un exponente entre −100 y 100."
  ],
  "Resultado fora do domínio ou muito grande.": [
    "Result outside the domain or too large.",
    "Resultado fuera del dominio o demasiado grande."
  ],
  "Expressão muito longa.": [
    "Expression is too long.",
    "Expresión demasiado larga."
  ],
  "Caractere não permitido.": [
    "Character not allowed.",
    "Carácter no permitido."
  ],
  "Digite uma conta.": [
    "Enter a calculation.",
    "Introduce un cálculo."
  ],
  "Expressão muito complexa.": [
    "Expression is too complex.",
    "Expresión demasiado compleja."
  ],
  "Complete a expressão.": [
    "Complete the expression.",
    "Completa la expresión."
  ],
  "Feche os parênteses.": [
    "Close the parentheses.",
    "Cierra los paréntesis."
  ],
  "Use parênteses na função.": [
    "Use parentheses for the function.",
    "Usa paréntesis en la función."
  ],
  "Expressão inválida.": [
    "Invalid expression.",
    "Expresión inválida."
  ],
  "Confira os operadores.": [
    "Check the operators.",
    "Revisa los operadores."
  ],
  "Tangente indefinida nesse ângulo.": [
    "Tangent is undefined at this angle.",
    "Tangente indefinida en este ángulo."
  ],
  "Resultado muito grande.": [
    "Result is too large.",
    "Resultado demasiado grande."
  ],
  "Tema inválido.": [
    "Invalid theme.",
    "Tema inválido."
  ],
  "Orçamento inválido.": [
    "Invalid budget.",
    "Presupuesto inválido."
  ],
  "Backup incompatível.": [
    "Incompatible backup.",
    "Copia de seguridad incompatible."
  ],
  "Não foi possível restaurar o backup.": [
    "Could not restore the backup.",
    "No se pudo restaurar la copia de seguridad."
  ]
};
export function t(text){const pair=messages[text];if(pair)return language==='pt'?text:pair[language==='en'?0:1];let m;if((m=text.match(/^(.*) · 9 opções$/)))return m[1]+(language==='en'?' · 9 options':language==='es'?' · 9 opciones':' · 9 opções');if((m=text.match(/^Volta (\d+)$/)))return t('Volta')+' '+m[1];if((m=text.match(/^Ângulos: (DEG|RAD)$/)))return t('Ângulos:')+' '+m[1];if(text.startsWith('Prévia do tema '))return (language==='en'?'Theme preview: ':language==='es'?'Vista previa del tema: ':'Prévia do tema ')+text.slice('Prévia do tema '.length);if(text.startsWith('Preencha a variável '))return (language==='en'?'Fill in variable ':language==='es'?'Completa la variable ':'Preencha a variável ')+text.slice('Preencha a variável '.length);return text}
export function translateDOM(root){const walker=document.createTreeWalker(root,4);let node;while((node=walker.nextNode())){const value=node.nodeValue,trim=value.trim();if(trim)node.nodeValue=value.replace(trim,t(trim))}for(const el of [root,...root.querySelectorAll('*')])for(const attr of ['aria-label','placeholder','title'])if(el.hasAttribute?.(attr))el.setAttribute(attr,t(el.getAttribute(attr)))}
// Format the exact decimal string, without converting large rational results to floating point.
export function formatNumber(text){const [integer,fraction]=String(text).split(',');const sep=language==='en'?',':'.';return integer.replace(/\B(?=(\d{3})+(?!\d))/g,sep)+(fraction?decimal()+fraction:'')}
export function displayExpression(text){return language==='en'?text.replace(/,/g,'.'):text}
export function canonicalExpression(text){const en=language==='en';return text.replace(/(?:\d[\d.,\u00a0\u202f]*|[.,]\d+)/g,token=>{token=token.replace(/[\u00a0\u202f]/g,'');const group=en?',':'.';if(en){if(!/^\d{1,3}(?:,\d{3})*(?:\.\d*)?$/.test(token)&&token.includes(','))throw Error('Informe um número válido.');token=token.split(group).join('')}else if(token.includes(',')){if(token.includes('.')&&!/^\d{1,3}(?:\.\d{3})+,\d*$/.test(token))throw Error('Informe um número válido.');token=token.split(group).join('')}else if(/^\d{1,3}(?:\.\d{3})+$/.test(token))token=token.replace(/\./g,'');return token.replace(/\./g,',')})}
export const dictionary=messages;
