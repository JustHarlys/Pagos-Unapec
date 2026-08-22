import * as cheerio from 'cheerio'

const CALENDAR_URL = 'https://calendario.unapec.edu.do/'

const MONTHS = {
  enero: 1,
  febrero: 2,
  marzo: 3,
  abril: 4,
  mayo: 5,
  junio: 6,
  julio: 7,
  agosto: 8,
  septiembre: 9,
  octubre: 10,
  noviembre: 11,
  diciembre: 12,
}

const IMPORTANT_KEYWORDS = [
  'evaluación parcial',
  'evaluacion parcial',
  'p.ev.p',
  's.ev.p',

  'exámenes finales',
  'examenes finales',
  'examen final',

  'exámenes diferidos',
    'examenes diferidos',
    'calificaciones finales',

  'inicio de docencia',

  'pago',
  'matriculación tardía',
  'matriculacion tardia',

  'retiro de asignaturas',
  'retiros de asignaturas',

  'publicación de calificaciones',
  'publicacion de calificaciones',

  'fecha límite para publicación',
  'fecha limite para publicacion',

  'selección',
  'seleccion',
  'preselección',
  'preseleccion',

  'graduación',
  'graduacion',

  'asueto',
]

function normalizeText(text = '') {
  return text
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeDateText(text = '') {
  return text
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function isImportant(text) {
  const normalized = text.toLowerCase()

  return IMPORTANT_KEYWORDS.some((keyword) =>
    normalized.includes(keyword)
  )
}

function getCategory(text) {
  const value = text.toLowerCase()

  const isFirstPartial =
    value.includes('primera evaluación parcial') ||
    value.includes('primera evaluacion parcial') ||
    value.includes('p.ev.p')

  const isSecondPartial =
    value.includes('segunda evaluación parcial') ||
    value.includes('segunda evaluacion parcial') ||
    value.includes('s.ev.p')

  const isGradePublication =
    value.includes('publicación de calificaciones') ||
    value.includes('publicacion de calificaciones')

  const isPublicationDeadline =
    value.includes('fecha límite') ||
    value.includes('fecha limite') ||
    value.includes('último día') ||
    value.includes('ultimo dia')

  /*
   * Calificaciones de la primera evaluación.
   */
  if (isFirstPartial && isGradePublication && isPublicationDeadline) {
    return 'first_partial_grades_deadline'
  }

  if (isFirstPartial && isGradePublication) {
    return 'first_partial_grades'
  }

  /*
   * Calificaciones de la segunda evaluación.
   */
  if (isSecondPartial && isGradePublication && isPublicationDeadline) {
    return 'second_partial_grades_deadline'
  }

  if (isSecondPartial && isGradePublication) {
    return 'second_partial_grades'
  }

  /*
   * Evaluaciones.
   */
  if (isFirstPartial) {
    return 'first_partial'
  }

  if (isSecondPartial) {
    return 'second_partial'
  }

  /*
   * Matriculación tardía.
   */
  if (
    value.includes('matriculación tardía') ||
    value.includes('matriculacion tardia')
  ) {
    if (value.includes('pago')) {
      return 'late_payment'
    }

    return 'late_registration'
  }

  if (
  value.includes('exámenes diferidos') ||
  value.includes('examenes diferidos')
    ) {
    return 'deferred_final_exam'
    }

    if (
    value.includes('calificaciones finales') &&
    (
        value.includes('fecha límite') ||
        value.includes('fecha limite')
    )
    ) {
    return 'final_grades_deadline'
    }

  /*
   * Finales.
   */
  if (
    value.includes('exámenes finales') ||
    value.includes('examenes finales') ||
    value.includes('examen final')
  ) {
    return 'final_exam'
  }

  /*
   * Inicio del período.
   */
  if (value.includes('inicio de docencia')) {
    return 'classes_start'
  }

  /*
   * Retiros.
   */
  if (
    value.includes('retiro de asignaturas') ||
    value.includes('retiros de asignaturas')
  ) {
    return 'withdrawal'
  }

  /*
   * Pagos regulares.
   */
  if (value.includes('pago')) {
    return 'payment'
  }

  /*
   * Selección/preselección.
   */
  if (
    value.includes('selección') ||
    value.includes('seleccion') ||
    value.includes('preselección') ||
    value.includes('preseleccion')
  ) {
    return 'selection'
  }

  /*
   * Graduación.
   */
  if (
    value.includes('graduación') ||
    value.includes('graduacion')
  ) {
    return 'graduation'
  }

  /*
   * Asuetos.
   */
  if (value.includes('asueto')) {
    return 'holiday'
  }

  return 'other'
}

function getTitle(text) {
  const category = getCategory(text)

  const titles = {
    first_partial:
      'Primera Evaluación Parcial',

    second_partial:
      'Segunda Evaluación Parcial',

    first_partial_grades:
      'Publicación de calificaciones - Primera Evaluación',

    second_partial_grades:
      'Publicación de calificaciones - Segunda Evaluación',

    first_partial_grades_deadline:
      'Fecha límite de publicación - Primera Evaluación',

    second_partial_grades_deadline:
      'Fecha límite de publicación - Segunda Evaluación',

    final_exam:
      'Exámenes finales',

    classes_start:
      'Inicio de docencia',

    payment:
      'Pago de colegiatura',

    late_payment:
      'Pago de matriculación tardía',

    late_registration:
      'Matriculación tardía',

    withdrawal:
      'Retiro de asignaturas',

    selection:
      'Selección de asignaturas',

    graduation:
      'Graduación',

    holiday:
      'Día no laborable',

    deferred_final_exam:
      'Exámenes diferidos finales',

    final_grades_deadline:
      'Fecha límite de publicación de calificaciones finales',
  }

  return titles[category] ?? text
}

function findYear(text) {
  const match = text.match(/\b20\d{2}\b/)

  return match ? Number(match[0]) : null
}

function parseSingleDate(text, year) {
  if (!text) {
    return null
  }

  const normalized = normalizeDateText(text)

  const match = normalized.match(
    /(\d{1,2})\s+(?:de\s+)?(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
  )

  if (!match) {
    return null
  }

  const day = Number(match[1])
  const month = MONTHS[match[2].toLowerCase()]

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function parseDateRange(dateText, year) {
  if (!dateText) {
    return {
      startDate: null,
      endDate: null,
    }
  }

  const normalized = normalizeDateText(dateText)

  /*
   * Ejemplo:
   *
   * 10 agosto al 18 agosto
   * 10 de agosto al 18 de agosto
   */
  const rangeMatch = normalized.match(
    /(\d{1,2})\s+(?:de\s+)?(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+(?:al|hasta)\s+(\d{1,2})\s+(?:de\s+)?(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
  )

  if (rangeMatch) {
    const startText = `${rangeMatch[1]} ${rangeMatch[2]}`
    const endText = `${rangeMatch[3]} ${rangeMatch[4]}`

    return {
      startDate: parseSingleDate(startText, year),
      endDate: parseSingleDate(endText, year),
    }
  }

  /*
   * Fecha simple.
   */
  return {
    startDate: parseSingleDate(normalized, year),
    endDate: null,
  }
}

function findDateText($, element) {
  let current = $(element)

  /*
   * Subimos por varios padres buscando el bloque que
   * contiene la fecha asociada al evento.
   */
  for (let level = 0; level < 5; level++) {
    const parent = current.parent()

    if (!parent.length) {
      break
    }

    const parentText = normalizeText(parent.text())

    /*
     * Primero buscamos intervalos.
     */
    const rangeMatch = parentText.match(
      /\b(\d{1,2})\s+(?:de\s+)?(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+(?:al|hasta)\s+(\d{1,2})\s+(?:de\s+)?(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\b/i
    )

    if (rangeMatch) {
      return normalizeText(rangeMatch[0])
    }

    /*
     * Después fechas individuales.
     */
    const singleMatch = parentText.match(
      /\b(\d{1,2})\s+(?:de\s+)?(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\b/i
    )

    if (singleMatch) {
      return normalizeText(singleMatch[0])
    }

    current = parent
  }

  return null
}

function getStatus(startDate, endDate) {
  if (!startDate) {
    return 'unknown'
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const start = new Date(`${startDate}T00:00:00`)

  const end = endDate
    ? new Date(`${endDate}T00:00:00`)
    : start

  if (end < today) {
    return 'past'
  }

  /*
   * Si hoy está dentro del intervalo, el evento
   * está ocurriendo actualmente.
   */
  if (start <= today && end >= today) {
    return 'today'
  }

  return 'upcoming'
}

export default async function handler(req, res) {
  try {
    const response = await fetch(CALENDAR_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',

        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',

        'Accept-Language':
          'es-DO,es;q=0.9,en;q=0.8',

        Referer:
          'https://www.unapec.edu.do/',
      },
    })

    if (!response.ok) {
      throw new Error(
        `El calendario de UNAPEC respondió con HTTP ${response.status}`
      )
    }

    const html = await response.text()

    const $ = cheerio.load(html)

    const bodyText = normalizeText(
      $('body').text()
    )

    const defaultYear =
      findYear(bodyText) ??
      new Date().getFullYear()

    const events = []
    const seen = new Set()

    $('body *').each((_, element) => {
      const current = $(element)

      /*
       * Solo procesamos nodos terminales para evitar
       * capturar contenedores completos varias veces.
       */
      if (current.children().length > 0) {
        return
      }

      const text = normalizeText(
        current.text()
      )

      if (!text || text.length < 5) {
        return
      }

      if (!isImportant(text)) {
        return
      }

      const dateText = findDateText(
        $,
        element
      )

      /*
       * Si el propio evento especifica otro año,
       * preferimos ese.
       */
      const year =
        findYear(text) ??
        defaultYear

      const {
        startDate,
        endDate,
      } = parseDateRange(
        dateText,
        year
      )

      const category =
        getCategory(text)

      const title =
        getTitle(text)

      const status =
        getStatus(
          startDate,
          endDate
        )

      /*
       * Evita duplicados.
       */
      const key =
        `${dateText}-${text}`

      if (seen.has(key)) {
        return
      }

      seen.add(key)

      events.push({
        title,
        description: text,
        category,
        dateText,
        startDate,
        endDate,
        status,
      })
    })

    /*
     * Orden cronológico.
     */
    events.sort((a, b) => {
      if (
        !a.startDate &&
        !b.startDate
      ) {
        return 0
      }

      if (!a.startDate) {
        return 1
      }

      if (!b.startDate) {
        return -1
      }

      return (
        new Date(
          `${a.startDate}T00:00:00`
        ) -
        new Date(
          `${b.startDate}T00:00:00`
        )
      )
    })

    /*
     * Vercel puede mantener el resultado durante seis
     * horas antes de volver a consultar UNAPEC.
     */
    res.setHeader(
      'Cache-Control',
      's-maxage=21600, stale-while-revalidate=86400'
    )

    return res.status(200).json({
      source: CALENDAR_URL,
      updatedAt:
        new Date().toISOString(),
      count: events.length,
      events,
    })
  } catch (error) {
    console.error(
      'Calendar scraper error:',
      error
    )

    return res.status(500).json({
      error:
        'No se pudo obtener el calendario académico.',

      details:
        error.message,
    })
  }
}