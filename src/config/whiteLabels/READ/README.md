# Configuração de White Labels

Este diretório contém os arquivos de configuração para cada white label suportado pela plataforma. As configurações definem as características visuais, de conteúdo e comportamentais específicas de cada marca.

## Estrutura dos Arquivos

Cada white label possui seu próprio arquivo de configuração JSON:

- `johngalt.config.json` - Configuração para John Galt
- `alfred.config.json` - Configuração para Alfred P2P
- `strategymars.config.json` - Configuração para Strategy Mars
- `example.config.json` - Exemplo com comentários explicativos de cada campo

## Como Adicionar um Novo White Label

Para adicionar um novo white label:

1. Crie um novo arquivo de configuração seguindo o modelo `example.config.json`
2. Adicione os assets necessários (logos, imagens, etc.) em `/public/{seu-white-label}/`
3. Adicione o novo white label ao mapeamento de domínios em `src/config/whiteLabels.ts`
4. Crie arquivos de tradução específicos em `src/domain/locales/whiteLabels/{seu-white-label}/`

## Campos da Configuração

### Identificadores Básicos

- `id`: Identificador único usado em URLs e nomes de arquivos
- `name`: Nome completo da marca
- `shortName`: Abreviação (2-3 letras)

### Contatos

- `supportEmail`: Email de suporte
- `supportPhone`: Telefone de suporte
- `supportWhatsapp`: WhatsApp de suporte

### Cores

Todas as cores devem estar em formato hexadecimal (#RRGGBB)

- `colors.primary`: Cor principal da marca
- `colors.secondary`: Cor secundária
- `colors.accent`: Cor de destaque
- `colors.background`: Cor de fundo principal
- `colors.backgroundSecondary`: Cor de fundo para áreas secundárias
- `colors.text`: Cor do texto principal
- `colors.primaryHover`: Cor de hover para elementos principais
- `colors.secondaryHover`: Cor de hover para elementos secundários
- `colors.success`: Cor para mensagens de sucesso
- `colors.error`: Cor para mensagens de erro
- `colors.warning`: Cor para mensagens de alerta

### Redes Sociais

Deixe em branco ("") se não tiver uma determinada rede social.

- `socialMedia.instagram`: URL do Instagram
- `socialMedia.twitter`: URL do Twitter (X)
- `socialMedia.facebook`: URL do Facebook
- `socialMedia.telegram`: URL do Telegram
- `socialMedia.linkedin`: URL do LinkedIn

### Fontes

Use nomes de fontes do Google Fonts.

- `fonts.main`: Fonte principal
- `fonts.headings`: Fonte para títulos

### Logos

- `logo.main`: Logo principal
- `logo.mainDark`: Versão escura
- `logo.mainLight`: Versão clara
- `logo.type`: Logo com texto
- `logo.typeDark`: Logo com texto (versão escura)
- `logo.typeLight`: Logo com texto (versão clara)
- `logo.alternative`: Logo alternativa
- `logo.icon`: Ícone (formato quadrado)
- `logo.footer`: Logo do rodapé
- `logo.levelIcon`: Ícone para níveis de usuário
- `logo.applyLevelIconFilter`: Se deve aplicar filtros CSS ao ícone de nível

### Fundo

- `background.hero`: Caminho para a imagem de fundo principal
- `background.opacity`: Opacidade (0-100)

### Níveis de Usuário

- `userLevels.level0` até `userLevels.level5`: Nomes dos níveis
- `userLevels.colors.level0` até `userLevels.colors.level5`: Cores por nível
- `userLevels.icons.level0` até `userLevels.icons.level5`: Ícones/emojis por nível

### SEO

- `metaTags.title`: Título da página
- `metaTags.description`: Descrição (150-160 caracteres)
- `metaTags.ogImage`: Imagem para compartilhamento em redes sociais

## Internacionalização

Para adicionar traduções específicas do white label, crie arquivos em:
`src/domain/locales/whiteLabels/{id do white label}/{código do idioma}/translation.json`

Por exemplo:

- `src/domain/locales/whiteLabels/johngalt/pt/translation.json`
- `src/domain/locales/whiteLabels/johngalt/en/translation.json`
- `src/domain/locales/whiteLabels/johngalt/es/translation.json`
