type EnvValueMap = Record<string, string | undefined>

const getImportMetaEnv = (): EnvValueMap => {
  return (import.meta as ImportMeta & { env?: EnvValueMap }).env ?? {}
}

const getProcessEnv = (): EnvValueMap => {
  return (process.env as EnvValueMap) ?? {}
}

const getNuxtPublicConfig = (): EnvValueMap => {
  if (!import.meta.client) {
    return {}
  }

  return ((globalThis as { __NUXT__?: { config?: { public?: EnvValueMap } } }).__NUXT__?.config?.public) ?? {}
}

const resolveEnvValue = (candidateKeys: string[]): string | undefined => {
  const sources = [getImportMetaEnv(), getProcessEnv(), getNuxtPublicConfig()]

  for (const source of sources) {
    for (const key of candidateKeys) {
      const value = source[key]

      if (typeof value === 'string' && value.trim()) {
        return value
      }
    }
  }

  return undefined
}

export const getDogApiBaseUrl = (): string | undefined => {
  return resolveEnvValue(['DOG_API', 'NUXT_PUBLIC_DOG_API', 'dogApi'])
}

export const getDogApiBreedsSegment = (): string | undefined => {
  return resolveEnvValue(['DOG_API_BREEDS_SEGMENT', 'NUXT_PUBLIC_DOG_API_BREEDS_SEGMENT', 'dogApiBreedsSegment'])
}

export const getDogCeoApiBaseUrl = (): string | undefined => {
  return resolveEnvValue(['DOG_CEO_API', 'NUXT_PUBLIC_DOG_CEO_API', 'dogCeoApi'])
}

export const getDogCeoImageSegment = (): string | undefined => {
  return resolveEnvValue(['DOG_CEO_ARI_SEGMENT', 'NUXT_PUBLIC_DOG_CEO_ARI_SEGMENT', 'dogCeoAriSegment'])
}
