import { LOCALE_SHORT_LABELS } from '~/constants/localeLabels'

export const DEFAULT_LOCALE = 'en' as const

export const SUPPORTED_LOCALES = ['en', 'uk'] as const

export type SupportedLocale = typeof SUPPORTED_LOCALES[number]

export const localeMessages = {
  en: {
    common: {
      language: {
        en: LOCALE_SHORT_LABELS.en,
        uk: LOCALE_SHORT_LABELS.uk,
      },
      languageName: {
        en: 'English',
        uk: 'Ukrainian',
      },
      yes: 'Yes',
      no: 'No',
    },
    index: {
      headTitle: "Ahineia's Site Main Page",
      headDescription: "This is the main page of Ahineia's site",
      greetingWithTitle: 'Greeting from {title}',
      greetingWithoutTitle: 'Greeting, stranger creature',
      placeholderText:
        'Ultimately, this page is a placeholder to show how to use app config and head management. You can replace it with your own content.',
      languageSwitcherLabel: 'Language',
      languageToggleLabel: 'Toggle language between English and Ukrainian',
      themeSwitcherLabel: 'Theme',
      themeOption: {
        light: '🌝',
        dark: '🌚',
        unicorn: '🦄',
      },
      switchLanguageTo: 'Switch language to {language}',
    },
    dogFacts: {
      fetchButton: 'Fetch Dog Breeds',
      refreshImageButton: 'Refresh random image',
      randomImageTitle: 'Random dog image',
      randomImageAlt: 'A random dog from Dog CEO API',
      lifeSpan: 'Life Span: {min} - {max} years',
      maleWeight: 'Male Weight: {min} - {max} kg',
      femaleWeight: 'Female Weight: {min} - {max} kg',
      hypoallergenic: 'Hypoallergenic: {value}',
      loadingStatus: 'Loading dog data',
      breedsRegionLabel: 'Dog breed results',
      imageRegionLabel: 'Random dog image section',
      breedDetailsLabel: 'Breed details for {breed}',
      breedsError: 'Could not load dog breeds.',
      imageError: 'Could not load random dog image.',
    },
    ui: {
      circle: 'Circle',
      square: 'Square',
    },
  },
  uk: {
    common: {
      language: {
        en: LOCALE_SHORT_LABELS.en,
        uk: LOCALE_SHORT_LABELS.uk,
      },
      languageName: {
        en: 'Англійська',
        uk: 'Українська',
      },
      yes: 'Так',
      no: 'Ні',
    },
    index: {
      headTitle: "Головна сторінка сайту Ahineia",
      headDescription: 'Це головна сторінка сайту Ahineia',
      greetingWithTitle: 'Вітання від {title}',
      greetingWithoutTitle: 'Вітання, незнайома істото',
      placeholderText:
        'Зрештою, ця сторінка лише показує, як використовувати конфігурацію застосунку та керування head. Ви можете замінити її власним вмістом.',
      languageSwitcherLabel: 'Мова',
      languageToggleLabel: 'Перемкнути мову між англійською та українською',
      themeSwitcherLabel: 'Тема',
      themeOption: {
        light: '🌝',
        dark: '🌚',
        unicorn: '🦄',
      },
      switchLanguageTo: 'Перемкнути мову на {language}',
    },
    dogFacts: {
      fetchButton: 'Завантажити породи собак',
      refreshImageButton: 'Оновити випадкове фото',
      randomImageTitle: 'Випадкове фото собаки',
      randomImageAlt: 'Випадкова собака з API Dog CEO',
      lifeSpan: 'Тривалість життя: {min} - {max} років',
      maleWeight: 'Вага самця: {min} - {max} кг',
      femaleWeight: 'Вага самки: {min} - {max} кг',
      hypoallergenic: 'Гіпоалергенність: {value}',
      loadingStatus: 'Завантаження даних про собак',
      breedsRegionLabel: 'Результати порід собак',
      imageRegionLabel: 'Секція випадкового фото собаки',
      breedDetailsLabel: 'Деталі породи {breed}',
      breedsError: 'Не вдалося завантажити породи собак.',
      imageError: 'Не вдалося завантажити випадкове фото собаки.',
    },
    ui: {
      circle: 'Кружечок',
      square: 'Квадрат',
    },
  },
} as const
