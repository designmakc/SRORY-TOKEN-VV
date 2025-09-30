// Auto-generated file. Do not edit manually.
// Generated at: 2025-09-30T12:15:10.877Z

/**
 * Доступные темы оформления
 */
export type ThemeName = 'blue' | 'red' | 'stone';

/**
 * Доступные breakpoints
 */
export type Breakpoint = 'wide' | 'desktop' | 'tablet' | 'mobile';

/**
 * Конфигурация режимов для токенов
 */
export interface TokenModeConfig {
  /** Тема оформления */
  theme?: ThemeName;
  /** Breakpoint для адаптивности */
  breakpoint?: Breakpoint;
  /** Дополнительные режимы коллекций */
  [collectionName: string]: string | undefined;
}

/**
 * Типы значений токенов
 */
export type TokenValue = string | number;

/**
 * Имена всех доступных токенов
 */
export type TokenName = 
  | 'color/stone/300'
  | 'color/stone/500'
  | 'color/stone/700'
  | 'color/stone/900'
  | 'color/stone/900-40'
  | 'color/stone/900-0'
  | 'color/stone/940'
  | 'color/stone/950'
  | 'color/blue/300'
  | 'color/blue/300-16'
  | 'color/blue/500'
  | 'color/blue/700'
  | 'color/blue/800'
  | 'color/blue/900'
  | 'color/blue/900-94'
  | 'color/blue/900-40'
  | 'color/blue/900-0'
  | 'color/blue/940'
  | 'color/blue/950'
  | 'color/yellow/300'
  | 'color/yellow/500'
  | 'color/yellow/700'
  | 'color/yellow/900'
  | 'color/yellow/700-50'
  | 'color/yellow/500-35'
  | 'color/yellow/500-20'
  | 'color/green/300'
  | 'color/green/500'
  | 'color/green/700'
  | 'color/green/900'
  | 'color/green/500-35'
  | 'color/green/500-20'
  | 'color/green/900-50'
  | 'color/rose/500'
  | 'color/rose/300'
  | 'color/red/300'
  | 'color/red/500'
  | 'color/red/700'
  | 'color/red/900'
  | 'color/rose/500-35'
  | 'color/rose/500-20'
  | 'color/rose/200-35'
  | 'color/rose/200-20'
  | 'color/purple/500'
  | 'color/purple/700'
  | 'color/purple/500-35'
  | 'color/grey/800'
  | 'color/purple/500-20'
  | 'color/grey/800-40'
  | 'color/purple/500-0'
  | 'color/grey/800-0'
  | 'color/grey/900'
  | 'color/neutrals/white/0'
  | 'color/grey/950'
  | 'color/neutrals/white/50'
  | 'color/neutrals/white/100'
  | 'color/neutrals/white/200'
  | 'color/neutrals/white/300'
  | 'color/neutrals/white/500'
  | 'color/neutrals/white/700'
  | 'color/neutrals/white/900'
  | 'color/neutrals/white/1000'
  | 'color/neutrals/black/0'
  | 'color/neutrals/black/50'
  | 'color/neutrals/black/100'
  | 'color/neutrals/black/200'
  | 'color/neutrals/black/300'
  | 'color/neutrals/black/500'
  | 'color/neutrals/black/700'
  | 'color/neutrals/black/900'
  | 'color/neutrals/black/1000'
  | 'spacing/space-0'
  | 'spacing/space-1'
  | 'spacing/space-2'
  | 'spacing/space-3'
  | 'spacing/space-4'
  | 'spacing/space-5'
  | 'spacing/space-6'
  | 'spacing/space-8'
  | 'spacing/space-10'
  | 'spacing/space-12'
  | 'spacing/space-14'
  | 'spacing/space-16'
  | 'spacing/space-20'
  | 'spacing/space-24'
  | 'spacing/space-28'
  | 'sizing/sizing-6'
  | 'spacing/space-32'
  | 'spacing/space-40'
  | 'sizing/sizing-8'
  | 'spacing/space-48'
  | 'sizing/sizing-10'
  | 'spacing/space-52'
  | 'spacing/space-64'
  | 'spacing/space-80'
  | 'spacing/space-96'
  | 'sizing/sizing-12'
  | 'sizing/sizing-16'
  | 'sizing/sizing-18'
  | 'sizing/sizing-20'
  | 'sizing/sizing-24'
  | 'sizing/sizing-28'
  | 'sizing/sizing-32'
  | 'sizing/sizing-36'
  | 'sizing/sizing-40'
  | 'sizing/sizing-48'
  | 'sizing/sizing-52'
  | 'sizing/sizing-56'
  | 'sizing/sizing-64'
  | 'sizing/sizing-80'
  | 'sizing/sizing-96'
  | 'sizing/sizing-120'
  | 'sizing/sizing-200'
  | 'border-width/0'
  | 'border-radius/0'
  | 'border-radius/2'
  | 'border-radius/4'
  | 'border-radius/8'
  | 'border-radius/12'
  | 'border-radius/16'
  | 'border-radius/24'
  | 'border-radius/32'
  | 'border-radius/9999'
  | 'border-width/1'
  | 'border-width/2'
  | 'border-width/4'
  | 'opacity/0'
  | 'opacity/2'
  | 'opacity/4'
  | 'opacity/6'
  | 'opacity/8'
  | 'opacity/10'
  | 'opacity/12'
  | 'opacity/14'
  | 'opacity/16'
  | 'opacity/18'
  | 'opacity/20'
  | 'opacity/24'
  | 'opacity/30'
  | 'opacity/35'
  | 'opacity/40'
  | 'opacity/50'
  | 'opacity/60'
  | 'opacity/70'
  | 'opacity/80'
  | 'opacity/90'
  | 'opacity/95'
  | 'opacity/100'
  | 'color/slate/100'
  | 'duration/0'
  | 'duration/75'
  | 'duration/100'
  | 'duration/150'
  | 'duration/200'
  | 'duration/300'
  | 'duration/500'
  | 'duration/700'
  | 'duration/1000'
  | 'breakpoint/mobile'
  | 'breakpoint/tablet'
  | 'breakpoint/desktop'
  | 'breakpoint/wide'
  | 'typography/font-family/primary'
  | 'typography/font-family/secondary'
  | 'typography/font-family/tertiary'
  | 'typography/font-size/8'
  | 'typography/font-size/9'
  | 'typography/font-size/10'
  | 'typography/font-size/12'
  | 'typography/font-size/14'
  | 'typography/font-size/16'
  | 'typography/font-size/18'
  | 'typography/font-size/20'
  | 'typography/font-size/22'
  | 'typography/font-size/24'
  | 'typography/font-size/28'
  | 'typography/font-size/32'
  | 'typography/font-size/36'
  | 'typography/font-size/40'
  | 'typography/font-weight/100'
  | 'typography/font-weight/300'
  | 'typography/font-weight/400'
  | 'typography/font-weight/500'
  | 'typography/font-weight/600'
  | 'typography/font-weight/700'
  | 'typography/font-weight/900'
  | 'typography/paragraph-spacing/8'
  | 'typography/line-height/8'
  | 'typography/line-height/10'
  | 'typography/line-height/12'
  | 'typography/line-height/14'
  | 'typography/line-height/16'
  | 'typography/line-height/18'
  | 'typography/line-height/20'
  | 'typography/line-height/22'
  | 'typography/line-height/24'
  | 'typography/line-height/26'
  | 'typography/line-height/30'
  | 'typography/line-height/32'
  | 'typography/line-height/36'
  | 'typography/line-height/40'
  | 'typography/letter-spacing/0'
  | 'typography/letter-spacing/024'
  | 'typography/letter-spacing/028'
  | 'typography/letter-spacing/03'
  | 'typography/letter-spacing/032'
  | 'typography/letter-spacing/036'
  | 'typography/letter-spacing/04'
  | 'typography/letter-spacing/042'
  | 'typography/letter-spacing/048'
  | 'typography/letter-spacing/054'
  | 'typography/letter-spacing/06'
  | 'typography/letter-spacing/066'
  | 'color/lime/300'
  | 'color/lime/500'
  | 'color/lime/700'
  | 'color/lime/1000'
  | 'color/lime/300-50'
  | 'color/lime/300-35'
  | 'color/lime/300-20'
  | 'color/slate/300'
  | 'color/slate/500'
  | 'color/slate/700'
  | 'color/slate/300-10'
  | 'color/slate/300-33'
  | 'color/slate/300-40'
  | 'color/pink/500'
  | 'color/pink/300'
  | 'color/pink/500-35'
  | 'color/pink/500-20'
  | 'color/pink/200-35'
  | 'color/pink/200-20'
  | 'color/background/page/lvl-1'
  | 'color/background/top-menu'
  | 'color/background/page/lvl-2'
  | 'color/background/page/lvl-3'
  | 'color/background/button/primary/default'
  | 'color/background/button/primary/hover'
  | 'color/background/button/primary/press'
  | 'color/background/button/primary/loader'
  | 'color/background/button/secondary/default'
  | 'color/background/button/secondary/hover'
  | 'color/background/button/secondary/press'
  | 'color/background/button/secondary/loader'
  | 'color/background/button/tertiary/default'
  | 'color/background/button/tertiary/hover'
  | 'color/background/button/tertiary/press'
  | 'color/background/button/tertiary/loader'
  | 'color/background/button/accentGreen/default'
  | 'color/background/button/accentGreen/hover'
  | 'color/background/button/accentGreen/press'
  | 'color/background/button/accentGreen/loader'
  | 'color/background/feedback/success/lvl-1'
  | 'color/background/feedback/success/lvl-2'
  | 'color/background/feedback/success/lvl-3'
  | 'color/background/feedback/warning/lvl-1'
  | 'color/background/feedback/warning/lvl-2'
  | 'color/background/feedback/warning/lvl-3'
  | 'color/background/feedback/error/lvl-1'
  | 'color/background/feedback/error/lvl-2'
  | 'color/background/feedback/error/lvl-3'
  | 'color/background/feedback/info/lvl-1'
  | 'color/background/feedback/inverse/lvl-1'
  | 'color/background/feedback/inverse/lvl-2'
  | 'color/background/feedback/primary'
  | 'color/background/feedback/secondary'
  | 'color/background/feedback/info/lvl-2'
  | 'color/background/feedback/info/lvl-3'
  | 'color/background/input/default'
  | 'color/text/primary'
  | 'color/text/secondary'
  | 'color/text/tertiary'
  | 'color/text/fourth'
  | 'color/text/inverse'
  | 'color/text/accent'
  | 'color/text/error'
  | 'color/text/success'
  | 'color/text/info'
  | 'color/text/on-interactive/primary'
  | 'color/text/on-interactive/secondary'
  | 'color/text/link/primary/default'
  | 'color/text/link/primary/hover'
  | 'color/border/interactive/default'
  | 'color/border/primary'
  | 'color/border/secondary'
  | 'color/border/accent'
  | 'color/icon/primary'
  | 'color/icon/secondary'
  | 'color/icon/tertiary'
  | 'color/icon/inverse'
  | 'color/icon/accent'
  | 'color/icon/avaliable'
  | 'color/icon/input/default'
  | 'color/icon/input/focus'
  | 'color/icon/feedback/success'
  | 'color/icon/feedback/error'
  | 'color/icon/feedback/warning'
  | 'color/icon/feedback/info'
  | 'color/icon/on-interactive/primary'
  | 'color/border/interactive/hover'
  | 'color/border/interactive/press'
  | 'color/border/interactive/focus'
  | 'color/border/interactive/error'
  | 'color/border/input/default'
  | 'color/border/input/hover'
  | 'color/border/input/focus'
  | 'color/border/input/error'
  | 'padding/none'
  | 'size/icon/3xs'
  | 'gap/input-selection/label'
  | 'gap/input-selection/group-item'
  | 'gap/input-selection/md/group-header'
  | 'gap/none'
  | 'gap/3xs'
  | 'gap/2xs'
  | 'gap/xs'
  | 'gap/sm'
  | 'gap/md'
  | 'gap/lg'
  | 'gap/xl'
  | 'gap/2xl'
  | 'gap/3xl'
  | 'gap/4xl'
  | 'gap/5xl'
  | 'size/icon/2xs'
  | 'size/icon/xs'
  | 'size/icon/sm'
  | 'size/icon/md'
  | 'size/logo/header'
  | 'size/icon/lg'
  | 'size/icon/xl'
  | 'size/icon/2xl'
  | 'size/input/height/sm'
  | 'padding/3xs'
  | 'size/main-container/max-width'
  | 'size/input/height/md'
  | 'size/main-container/min-width'
  | 'padding/2xs'
  | 'padding/xs'
  | 'padding/sm'
  | 'padding/md'
  | 'padding/lg'
  | 'padding/xl'
  | 'padding/2xl'
  | 'padding/3xl'
  | 'padding/4xl'
  | 'padding/5xl'
  | 'padding/6xl'
  | 'border-radius/none'
  | 'border-width/none'
  | 'border-width/xs'
  | 'border-width/sm'
  | 'border-width/md'
  | 'border-width/icon/md'
  | 'typography/paragraph-spacing/md'
  | 'opacity/disabled'
  | 'border-radius/xs'
  | 'border-radius/sm'
  | 'border-radius/md'
  | 'border-radius/lg'
  | 'border-radius/xl'
  | 'border-radius/full'
  | 'color/icon/on-interactive/secondary'
  | 'color/icon/on-interactive/tertiary'
  | 'typography/font-family/header'
  | 'typography/font-family/body'
  | 'typography/font-size/header/6xl'
  | 'typography/font-size/header/5xl'
  | 'typography/font-size/header/4xl'
  | 'typography/font-size/header/3xl'
  | 'typography/font-size/header/2xl'
  | 'typography/font-size/header/xl'
  | 'typography/font-size/header/lg'
  | 'typography/font-size/header/md'
  | 'typography/font-size/header/sm'
  | 'typography/font-size/header/xs'
  | 'typography/font-size/header/2xs'
  | 'typography/font-size/header/3xs'
  | 'typography/font-size/header/4xs'
  | 'typography/font-size/body/lg'
  | 'typography/font-size/body/md'
  | 'typography/font-size/body/sm'
  | 'typography/font-size/body/xs'
  | 'typography/font-size/body/2xs'
  | 'typography/font-weight/regular'
  | 'typography/font-weight/medium'
  | 'typography/font-weight/semibold'
  | 'typography/font-weight/bold'
  | 'typography/line-height/header/6xl'
  | 'typography/line-height/header/5xl'
  | 'typography/line-height/header/4xl'
  | 'typography/line-height/header/3xl'
  | 'typography/line-height/header/2xl'
  | 'typography/line-height/header/xl'
  | 'typography/line-height/header/lg'
  | 'typography/line-height/header/md'
  | 'typography/line-height/header/sm'
  | 'typography/line-height/header/xs'
  | 'typography/line-height/header/2xs'
  | 'typography/line-height/header/3xs'
  | 'typography/font-weight/header/6xl'
  | 'typography/font-weight/header/5xl'
  | 'typography/font-weight/header/4xl'
  | 'typography/font-weight/header/3xl'
  | 'typography/font-weight/header/2xl'
  | 'typography/font-weight/header/xl'
  | 'typography/font-weight/header/lg'
  | 'typography/font-weight/header/md'
  | 'typography/font-weight/header/sm'
  | 'typography/font-weight/header/xs'
  | 'typography/font-weight/header/2xs'
  | 'typography/font-weight/header/3xs'
  | 'typography/letter-spacing/header/6xl'
  | 'typography/letter-spacing/header/5xl'
  | 'typography/letter-spacing/header/4xl'
  | 'typography/letter-spacing/header/3xl'
  | 'typography/letter-spacing/header/2xl'
  | 'typography/letter-spacing/header/xl'
  | 'typography/letter-spacing/header/lg'
  | 'typography/letter-spacing/header/md'
  | 'typography/letter-spacing/header/sm'
  | 'typography/letter-spacing/header/xs'
  | 'typography/letter-spacing/header/2xs'
  | 'typography/letter-spacing/header/3xs'
  | 'typography/line-height/trim/4xl'
  | 'typography/line-height/trim/3xl'
  | 'typography/line-height/trim/2xl'
  | 'typography/line-height/trim/xl'
  | 'typography/line-height/trim/lg'
  | 'typography/line-height/trim/md'
  | 'typography/line-height/trim/sm'
  | 'typography/line-height/trim/xs'
  | 'typography/line-height/trim/2xs'
  | 'typography/line-height/trim/3xs'
  | 'typography/line-height/body/lg'
  | 'typography/line-height/body/md'
  | 'typography/line-height/body/sm'
  | 'typography/line-height/body/xs'
  | 'typography/line-height/body/2xs'
  | 'typography/line-height/body/3xs'
  | 'typography/line-height/body/4xs'
  | 'padding/section/horizontal'
  | 'padding/section/top'
  | 'gap/section/vertical'
  | 'padding/main-container/horizontal'
  | 'padding/main-content/top'
  | 'gap/main-content/vertical'
  | 'size/main-content/max-width'
  | 'size/main-content/min-width'
  | 'color/background/interactive/primary/default'
  | 'color/background/interactive/primary/hover'
  | 'color/background/interactive/primary/press'
  | 'color/background/interactive/secondary/default'
  | 'color/background/interactive/tertiary/default'
  | 'color/background/interactive/tertiary/hover'
  | 'color/background/interactive/tertiary/press'
  | 'color/background/interactive/tertiary/selected'
  | 'color/background/interactive/secondary/hover'
  | 'color/background/interactive/secondary/press'
  | 'color/background/interactive/fourth/default'
  | 'color/background/interactive/fourth/hover'
  | 'color/background/interactive/fourth/press'
  | 'color/background/interactive/fourth/selected'
  | 'color/background/interactive/fifth/default'
  | 'color/background/interactive/fifth/hover'
  | 'color/background/interactive/fifth/press'
  | 'color/background/interactive/fifth/selected'
  | 'color/background/interactive/accent/default'
  | 'color/background/interactive/accent/hover'
  | 'color/background/interactive/accent/press'
  | 'color/background/interactive/accent/loader'
  | 'gap/input-selection/sm/group-header'
  | 'color/background/section/lvl-1/default'
  | 'color/background/section/lvl-1/hover'
  | 'color/background/section/lvl-1/press'
  | 'color/background/section/lvl-2/default'
  | 'color/background/section/lvl-2/hover'
  | 'color/background/section/lvl-2/press'
  | 'color/background/section/lvl-3/default'
  | 'color/background/section/lvl-3/hover'
  | 'color/background/section/lvl-3/press'
  | 'color/background/navbar'
  | 'color/background/section/gradient/gradient-start'
  | 'color/background/section/gradient/gradient-end'
  | 'color/background/button/accentBlue/default'
  | 'color/background/button/accentBlue/hover'
  | 'color/background/button/accentBlue/press'
  | 'color/background/button/accentBlue/loader'
  | 'color/background/button/outline/default'
  | 'color/background/button/outline/hover'
  | 'color/background/button/outline/press'
  | 'color/background/button/outline/loader'
  | 'color/border/button/outline'
  | 'color/text/link/secondary/default'
  | 'color/text/link/secondary/hover'
  | 'color/text/link/tertiary/default'
  | 'color/text/link/tertiary/hover'
  | 'color/text/link/accent/default'
  | 'color/text/link/accent/hover'
  | 'color/text/input/label'
  | 'color/text/input/valueInput'
  | 'padding/input/md/horizontal'
  | 'padding/input/sm/horizontal'
  | 'padding/input/md/vertical'
  | 'padding/input/sm/vertical'
  | 'color/icon/timer/default'
  | 'color/icon/timer/expiring'
  | 'color/icon/timer/expired'
  | 'color/background/modal-overlay'
  | 'color/background/interactive/transparent-surfaces/default'
  | 'color/background/interactive/transparent-surfaces/hover'
  | 'color/background/interactive/transparent-surfaces/press'
  | 'color/background/interactive/transparent-surfaces/selected'
  | 'tooltip/spacing/offset'
  | 'button/border-radius/lg'
  | 'button/border-radius/md'
  | 'button/border-radius/sm'
  | 'button/border-radius/xs'
  | 'button/gap/icon-label'
  | 'button/padding/horizontal/xs'
  | 'button/size/height/xs'
  | 'button/size/height/sm'
  | 'button/size/height/md'
  | 'button/size/height/lg'
  | 'button/size/min-width/xs'
  | 'button/size/min-width/sm'
  | 'button/size/min-width/md'
  | 'button/size/min-width/lg'
  | 'button/padding/horizontal/sm'
  | 'button/padding/horizontal/md'
  | 'button/padding/vertical/xs'
  | 'button/padding/horizontal/lg'
  | 'button/padding/vertical/sm'
  | 'button/padding/vertical/md'
  | 'button/text-container/padding-horizontal/xs'
  | 'button/padding/vertical/lg'
  | 'button/padding/icon-only-lg'
  | 'button/padding/icon-only-md'
  | 'button/padding/icon-only-sm'
  | 'button/padding/icon-only-xs'
  | 'button/text-container/padding-horizontal/sm'
  | 'button/text-container/padding-horizontal/md'
  | 'button/text-container/padding-horizontal/lg'
  | 'button-cash/icon-background'
  | 'counter/border-radius'
  | 'counter/size/md/min-width'
  | 'counter/size/md/height'
  | 'counter/padding/md/horizontal'
  | 'counter/padding/md/vertical'
  | 'counter/size/sm/min-width'
  | 'counter/size/sm/height'
  | 'counter/padding/sm/horizontal'
  | 'counter/padding/sm/vertical'
  | 'counter/size/xs/width'
  | 'counter/size/xs/height'
  | 'counter/padding/xs/horizontal'
  | 'counter/padding/xs/vertical'
  | 'checkbox/border-radius'
  | 'checkbox/size/md'
  | 'checkbox/size/sm'
  | 'checkbox/padding/md'
  | 'radiobutton/border-radius'
  | 'radiobutton/size/md'
  | 'radiobutton/size/sm'
  | 'radiobutton/size/radioIcon/md'
  | 'radiobutton/size/radioIcon/sm'
  | 'radiobutton/padding/md'
  | 'toggle/border-radius'
  | 'toggle/padding'
  | 'toggle/size/width'
  | 'toggle/size/height'
  | 'toggle/size/toggleIcon'
  | 'chips/border-radius'
  | 'chips/padding/vertical'
  | 'chips/gap'
  | 'chips/padding/horizontal'
  | 'chips/size/min-width'
  | 'chips/size/height'
  | 'notification/border-radius'
  | 'notification/padding'
  | 'notification/gap'
  | 'notification/size/min-width'
  | 'notification/size/height'
  | 'tag/padding/bottom/md'
  | 'tag/padding/bottom/sm'
  | 'tag/padding/top/md'
  | 'tag/padding/top/sm'
  | 'tag/padding/top/xs'
  | 'tag/padding/horizontal/md'
  | 'tag/padding/horizontal/sm'
  | 'tag/color/background/green'
  | 'tag/gap'
  | 'tag/color/background/lime'
  | 'tag/color/background/white'
  | 'tag/color/background/purple'
  | 'tag/color/background/pink'
  | 'tag/color/background/rose'
  | 'tag/color/background/yellow'
  | 'tag/color/background/transparent'
  | 'tag/color/background/transparent-inverse'
  | 'tab/gap/lg'
  | 'tab/size/min-width'
  | 'scroll/size/max-height'
  | 'scroll/size/width'
  | 'tab/gap/md'
  | 'tab/gap/sm'
  | 'tab/padding/vertical/lg'
  | 'tab/padding/vertical/md'
  | 'tab/padding/vertical/sm'
  | 'tab/padding/vertical/xs'
  | 'tab/padding/horizontal/lg'
  | 'tab/padding/horizontal/md'
  | 'tab/padding/horizontal/sm'
  | 'tab/padding/horizontal/xs'
  | 'scroll/border-radius'
  | 'carousel/size/width'
  | 'carousel/size/height'
  | 'scroll/padding/vertical'
  | 'scroll/color/default'
  | 'carousel/gap'
  | 'pagination/color/default'
  | 'pagination/color/hover'
  | 'pagination/color/press'
  | 'pagination/color/selected'
  | 'pagination/color/selectedHover'
  | 'pagination/color/selectedPress'
  | 'pagination/border-radius'
  | 'carousel/color/selected'
  | 'pagination/size/width'
  | 'pagination/size/height'
  | 'pagination/gap'
  | 'pagination/padding/top'
  | 'pagination/padding/bottom'
  | 'carousel/color/default'
  | 'carousel/color/hover'
  | 'carousel/color/press'
  | 'carousel/color/selectedBorder'
  | 'carousel/color/defaultBorder'
  | 'scroll/padding/horizontal'
  | 'scroll/color/hover'
  | 'scroll/color/press'
  | 'tab/gap/xs'
  | 'dropdown/color/background-item/default'
  | 'dropdown/color/background-item/hover'
  | 'dropdown/color/background-item/press'
  | 'dropdown/color/background-item/selected'
  | 'dropdown/border-radius'
  | 'dropdown/size/min-width'
  | 'dropdown/size/min-height'
  | 'dropdown/gap'
  | 'progress-bar/color/background/progress/grey'
  | 'progress-bar/color/background/progress/green'
  | 'progress-bar/color/background/bar'
  | 'dropdown/color/background-list'
  | 'progress-bar/padding/horizontal/md'
  | 'progress-bar/gap/label-bar/md'
  | 'progress-bar/padding/horizontal/sm'
  | 'progress-bar/gap/label-bar/sm'
  | 'progress-bar/size/height/md'
  | 'progress-bar/size/height/sm'
  | 'progress-bar/border-radius/md'
  | 'progress-bar/border-radius/sm'
  | 'calendar/color/background/calendar-cell/default'
  | 'calendar/color/background/calendar-cell/hover'
  | 'calendar/color/background/calendar-cell/selected'
  | 'calendar/color/background/bar'
  | 'calendar/padding'
  | 'calendar/gap/calendar-cell/md'
  | 'calendar/gap/calendar-cell/sm'
  | 'calendar/size/calendar-cell/md'
  | 'calendar/size/calendar-cell/sm'
  | 'calendar/border-radius/calendar-cell'
  | 'timer/gap/lg'
  | 'timer/gap/md'
  | 'timer/gap/sm'
  | 'timer/gap/xs'
  | 'user/gap/lg'
  | 'user/gap/md'
  | 'user/gap/sm'
  | 'user/gap/xs'
  | 'user/gap/2xs'
  | 'lvl-badge/default'
  | 'lvl-badge/gap/lg'
  | 'lvl-badge/gap/md'
  | 'lvl-badge/gap/sm'
  | 'category-card/min-width'
  | 'category-card/min-heigth'
  | 'category-card/color/primary/default'
  | 'category-card/color/primary/hover'
  | 'category-card/color/primary/press'
  | 'category-card/color/secondary/default'
  | 'category-card/color/secondary/hover'
  | 'category-card/color/secondary/press'
  | 'modal/border-radius/md-top'
  | 'modal/border-radius/md-bottom'
  | 'modal/border-radius/lg'
  | 'modal/padding/md/horizontal'
  | 'modal/padding/lg'
  | 'modal/padding/md/vertical'
  | 'category-card/color/tertiary/default'
  | 'category-card/color/tertiary/hover'
  | 'category-card/color/tertiary/press'
  | 'typography/font-size/h1'
  | 'typography/font-size/h2'
  | 'typography/font-size/h3'
  | 'typography/font-size/h4'
  | 'typography/font-size/h5'
  | 'typography/line-height/h1'
  | 'typography/line-height/h2'
  | 'typography/line-height/h3'
  | 'typography/line-height/h4'
  | 'typography/line-height/h5'
  | 'typography/letter-spacing/h1'
  | 'typography/letter-spacing/h2'
  | 'typography/letter-spacing/h3'
  | 'typography/letter-spacing/h4'
  | 'typography/letter-spacing/h5'
  | 'typography/font-family'
  | 'typography/font-weight/h1'
  | 'typography/font-weight/h2'
  | 'typography/font-weight/h3'
  | 'typography/font-weight/h4'
  | 'typography/font-weight/h5'
  | 'sizing/main-container/width/max-width'
  | 'sizing/main-container/width/min-width'
  | 'sizing/main-content/width/max-width'
  | 'sizing/main-content/width/min-width'
  | 'padding/main-content/gap'
  | 'padding/main-content/horizontal'
  | 'padding/navbar/horizontal'
  | 'padding/navbar/vertical'
  | 'padding/breadcrumbs/horizontal'
  | 'gap/navbar/horizontal'
  | 'gap/breadcrumbs/sm'
  | 'sizing/header-logo'
  | 'sizing/navigation-panel/size'
  | 'sizing/burger-menu/size'
  | 'sizing/profile-menu/size'
  | 'sizing/footer/size'
  | 'sizing/header/size'
  | 'sizing/section/width/max-width'
  | 'sizing/section/title/size'
  | 'sizing/section/width/min-width'
  | 'sizing/header/width/max-width'
  | 'sizing/header/width/min-width'
  | 'sizing/header/top-menu/size'
  | 'sizing/footer/width/max-width'
  | 'sizing/game-section/size'
  | 'sizing/footer/width/min-width'
  | 'sizing/tournaments/section/size'
  | 'sizing/tournaments/card/min-width'
  | 'sizing/tournaments/card/max-height'
  | 'sizing/promo/section/size'
  | 'sizing/promo/card/min-width'
  | 'sizing/promo/card/max-height'
  | 'sizing/bonus/section/size'
  | 'sizing/bonus/card/max-width'
  | 'sizing/bonus/card/min-width'
  | 'sizing/message/card/size'
  | 'sizing/providers/card/size'
  | 'sizing/providers/section/size'
  | 'sizing/jackpot/card/size'
  | 'sizing/jackpot/section/size'
  | 'sizing/jackpot/header/size'
  | 'sizing/jackpot/group/String'
  | 'sizing/winner/section/size'
  | 'padding/event/horizontal'
  | 'padding/event/vertical'
  | 'sizing/event/card/size'
  | 'sizing/event/section/size'
  | 'sizing/main-banner/size'
  | 'sizing/profile/data-section/min-width'
  | 'sizing/profile/data-section/border-radius'
  | 'sizing/profile/data-section/padding/vertical'
  | 'padding/modal/md/horizontal'
  | 'padding/modal/lg'
  | 'padding/modal/md/vertical'
  | 'border-radius/modal/md-top'
  | 'border-radius/modal/md-bottom'
  | 'border-radius/modal/lg'
  | 'sizing/desk/desk-modal/max-width'
  | 'sizing/desk/desk-modal/min-width'
  | 'sizing/desk/desk-modal/size'
  | 'sizing/desk/method--group/size'
  | 'sizing/desk/mathod-card/min-width'
  | 'sizing/desk/mathod-card/max-width'
  | 'sizing/desk/desk-form/background'
  | 'sizing/desk/desk-actions/size'
  | 'sizing/modal/size-button'
  | 'sizing/modal/size-footer-lg'
  | 'sizing/modal/size-footer-md'
  | 'sizing/modal/min-width-md'
  | 'sizing/modal/max-width-md'
  | 'sizing/modal/min-width-lg'
  | 'sizing/modal/max-width-lg'
  | 'theme/color/background/page/lvl-1'
  | 'theme/color/background/page/lvl-2'
  | 'theme/color/background/page/lvl-3'
  | 'theme/color/background/section/default-start'
  | 'theme/color/background/section/default-end'
  | 'theme/color/background/section/accent-start'
  | 'theme/color/background/section/accent-end'
  | 'theme/typography/font-weight/6xl'
  | 'theme/typography/font-weight/5xl'
  | 'theme/typography/font-weight/4xl'
  | 'theme/typography/font-weight/3xl'
  | 'theme/typography/font-weight/2xl'
  | 'theme/typography/font-weight/xl'
  | 'theme/typography/font-weight/lg'
  | 'theme/typography/font-weight/md'
  | 'theme/typography/font-weight/sm'
  | 'theme/typography/font-weight/xs'
  | 'theme/typography/font-weight/2xs'
  | 'theme/typography/font-weight/3xs'
  | 'theme/typography/font-family/header'
  | 'theme/color/logotype'
  | 'theme/color/play-button'
  | 'theme/color/background/top-menu';

/**
 * Типы токенов по категориям
 */
export type ColorToken = string;
export type SpacingToken = number;
export type FontSizeToken = number;
export type BorderRadiusToken = number;

/**
 * Маппинг коллекций
 */
export interface CollectionInfo {
  modes: string[];
  variableCount: number;
}

export const COLLECTIONS: Record<string, CollectionInfo> = {
  'primitive': {
    modes: ['default'],
    variableCount: 232
  },
  'semantic': {
    modes: ['default'],
    variableCount: 281
  },
  'component': {
    modes: ['default'],
    variableCount: 189
  },
  'adaptive': {
    modes: ['wide', 'desktop', 'tablet', 'mobile'],
    variableCount: 98
  },
  'theme': {
    modes: ['blue', 'red', 'stone'],
    variableCount: 23
  }
};

/**
 * Константы тем
 */
export const THEMES = ['blue', 'red', 'stone'] as const;

/**
 * Константы breakpoints
 */
export const BREAKPOINTS = ['wide', 'desktop', 'tablet', 'mobile'] as const;

/**
 * Информация о токенах
 */
export interface TokenInfo {
  type: string;
  collection: string;
  description: string;
}

export const TOKEN_INFO: Record<TokenName, TokenInfo> = {
  'color/stone/300': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Светло-синий для состояний hover и фонов'
  },
  'color/stone/500': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Светло-синий для состояний hover и фонов'
  },
  'color/stone/700': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Основной синий для главных действий'
  },
  'color/stone/900': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Темно-синий для состояний нажатия'
  },
  'color/stone/900-40': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Темно-синий для состояний нажатия'
  },
  'color/stone/900-0': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Темно-синий для состояний нажатия'
  },
  'color/stone/940': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Самый темный синий для сильного акцента'
  },
  'color/stone/950': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Самый темный синий для сильного акцента'
  },
  'color/blue/300': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Светло-синий для состояний hover и фонов'
  },
  'color/blue/300-16': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Светло-синий для состояний hover и фонов'
  },
  'color/blue/500': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Основной синий для главных действий'
  },
  'color/blue/700': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Темно-синий для состояний нажатия'
  },
  'color/blue/800': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Более темный синий вариант'
  },
  'color/blue/900': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Самый темный синий для сильного акцента'
  },
  'color/blue/900-94': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Самый темный синий для сильного акцента'
  },
  'color/blue/900-40': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Самый темный синий для сильного акцента'
  },
  'color/blue/900-0': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Самый темный синий для сильного акцента'
  },
  'color/blue/940': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Самый темный синий для сильного акцента'
  },
  'color/blue/950': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Почти черный синий. Основной фон страниц'
  },
  'color/yellow/300': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Светло-желтый для подсветки'
  },
  'color/yellow/500': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Основной желтый для акцентных элементов'
  },
  'color/yellow/700': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Темно-желтый для выделения'
  },
  'color/yellow/900': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Самый темный желтый'
  },
  'color/yellow/700-50': {
    type: 'COLOR',
    collection: 'primitive',
    description: ''
  },
  'color/yellow/500-35': {
    type: 'COLOR',
    collection: 'primitive',
    description: ''
  },
  'color/yellow/500-20': {
    type: 'COLOR',
    collection: 'primitive',
    description: ''
  },
  'color/green/300': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Светло-зеленый для фонов успеха'
  },
  'color/green/500': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Основной зеленый для состояний успеха'
  },
  'color/green/700': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Темно-зеленый для выделения'
  },
  'color/green/900': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Самый темный зеленый для сильного успеха'
  },
  'color/green/500-35': {
    type: 'COLOR',
    collection: 'primitive',
    description: ''
  },
  'color/green/500-20': {
    type: 'COLOR',
    collection: 'primitive',
    description: ''
  },
  'color/green/900-50': {
    type: 'COLOR',
    collection: 'primitive',
    description: ''
  },
  'color/rose/500': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Основной красный для состояний ошибки'
  },
  'color/rose/300': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Светло-красный для фонов ошибок'
  },
  'color/red/300': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Средний красный'
  },
  'color/red/500': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Темно-красный'
  },
  'color/red/700': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Более темный красный для выделения'
  },
  'color/red/900': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Самый темный красный для критических ошибок'
  },
  'color/rose/500-35': {
    type: 'COLOR',
    collection: 'primitive',
    description: ''
  },
  'color/rose/500-20': {
    type: 'COLOR',
    collection: 'primitive',
    description: ''
  },
  'color/rose/200-35': {
    type: 'COLOR',
    collection: 'primitive',
    description: ''
  },
  'color/rose/200-20': {
    type: 'COLOR',
    collection: 'primitive',
    description: ''
  },
  'color/purple/500': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Основной фиолетовый для информационных состояний'
  },
  'color/purple/700': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Темно-фиолетовый для выделения'
  },
  'color/purple/500-35': {
    type: 'COLOR',
    collection: 'primitive',
    description: ''
  },
  'color/grey/800': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Темно-серый для поверхностей красного сайта'
  },
  'color/purple/500-20': {
    type: 'COLOR',
    collection: 'primitive',
    description: ''
  },
  'color/grey/800-40': {
    type: 'COLOR',
    collection: 'primitive',
    description: 'Темно-серый для поверхностей красного сайта'
  },
  'color/purple/500-0': {
    type: 'COLOR',
    collection: 'primitive',
    description: ''
  }
  // ... и остальные токены
};
