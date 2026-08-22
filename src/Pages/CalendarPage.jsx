import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  Link,
} from 'react-router-dom'

import unapecLogo from '../assets/image.png'

const categoryConfig = {
  first_partial: {
    label: 'Primera evaluación',
    icon: 'fa-solid fa-file-pen',
  },

  second_partial: {
    label: 'Segunda evaluación',
    icon: 'fa-solid fa-file-pen',
  },

  first_partial_grades: {
    label: 'Calificaciones',
    icon: 'fa-solid fa-square-poll-horizontal',
  },

  second_partial_grades: {
    label: 'Calificaciones',
    icon: 'fa-solid fa-square-poll-horizontal',
  },

  first_partial_grades_deadline: {
    label: 'Límite de calificaciones',
    icon: 'fa-solid fa-clock',
  },

  second_partial_grades_deadline: {
    label: 'Límite de calificaciones',
    icon: 'fa-solid fa-clock',
  },

  final_exam: {
    label: 'Exámenes finales',
    icon: 'fa-solid fa-graduation-cap',
  },

  classes_start: {
    label: 'Inicio de docencia',
    icon: 'fa-solid fa-book-open',
  },

  payment: {
    label: 'Pago',
    icon: 'fa-solid fa-credit-card',
  },

  late_payment: {
    label: 'Pago tardío',
    icon: 'fa-solid fa-money-check-dollar',
  },

  late_registration: {
    label: 'Matriculación tardía',
    icon: 'fa-solid fa-clock',
  },

  withdrawal: {
    label: 'Retiro',
    icon: 'fa-solid fa-arrow-right-from-bracket',
  },

  selection: {
    label: 'Selección',
    icon: 'fa-solid fa-list-check',
  },

  graduation: {
    label: 'Graduación',
    icon: 'fa-solid fa-user-graduate',
  },

  holiday: {
    label: 'Asueto',
    icon: 'fa-solid fa-calendar-day',
  },

    deferred_final_exam: {
    label: 'Examen diferido',
    icon: 'fa-solid fa-file-circle-question',
    },

    final_grades_deadline: {
    label: 'Calificaciones finales',
    icon: 'fa-solid fa-clock',
    },
}

function formatDateRange(
  startDate,
  endDate
) {
  if (!startDate) {
    return ''
  }

  const start =
    new Date(
      `${startDate}T00:00:00`
    )

  if (!endDate) {
    return new Intl.DateTimeFormat(
      'es-DO',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }
    ).format(start)
  }

  const end =
    new Date(
      `${endDate}T00:00:00`
    )

  const sameYear =
    start.getFullYear() ===
    end.getFullYear()

  const sameMonth =
    sameYear &&
    start.getMonth() ===
      end.getMonth()

  /*
   * 10 al 18 de agosto de 2026
   */
  if (sameMonth) {
    const monthYear =
      new Intl.DateTimeFormat(
        'es-DO',
        {
          month: 'long',
          year: 'numeric',
        }
      ).format(start)

    return `${start.getDate()} al ${end.getDate()} de ${monthYear}`
  }

  /*
   * Ejemplo:
   * 29 de agosto al 3 de septiembre de 2026
   */
  if (sameYear) {
    const startText =
      new Intl.DateTimeFormat(
        'es-DO',
        {
          day: 'numeric',
          month: 'long',
        }
      ).format(start)

    const endText =
      new Intl.DateTimeFormat(
        'es-DO',
        {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }
      ).format(end)

    return `${startText} al ${endText}`
  }

  return `${new Intl.DateTimeFormat(
    'es-DO',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  ).format(start)} al ${new Intl.DateTimeFormat(
    'es-DO',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  ).format(end)}`
}

function getDaysRemaining(event) {
  if (!event?.startDate) {
    return null
  }

  const today = new Date()

  today.setHours(
    0,
    0,
    0,
    0
  )

  const start =
    new Date(
      `${event.startDate}T00:00:00`
    )

  const end = event.endDate
    ? new Date(
        `${event.endDate}T00:00:00`
      )
    : start

  /*
   * Si ya empezó y todavía no termina,
   * está ocurriendo ahora.
   */
  if (
    today >= start &&
    today <= end
  ) {
    return 0
  }

  return Math.ceil(
    (
      start.getTime() -
      today.getTime()
    ) /
      (
        1000 *
        60 *
        60 *
        24
      )
  )
}

function EventCard({
  event,
  compact = false,
}) {
  const config =
    categoryConfig[
      event.category
    ] ?? {
      label: 'Evento',
      icon: 'fa-regular fa-calendar',
    }

  return (
    <Paper
      sx={{
        p: compact
          ? 2
          : 2.5,

        display: 'flex',

        gap: 2,

        alignItems:
          'flex-start',
      }}
    >
      <Box
        sx={{
          width: 42,
          height: 42,

          borderRadius: 2,

          bgcolor:
            'action.hover',

          display: 'flex',

          alignItems:
            'center',

          justifyContent:
            'center',

          flexShrink: 0,

          color:
            'primary.main',
        }}
      >
        <i
          className={
            config.icon
          }
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',

            justifyContent:
              'space-between',

            gap: 1,

            flexWrap:
              'wrap',

            mb: 0.5,
          }}
        >
          <Typography
            fontWeight={700}
          >
            {event.title}
          </Typography>

          <Chip
            label={
              config.label
            }

            size="small"

            variant="outlined"
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 0.75 }}
        >
          {event.description}
        </Typography>

        <Typography
          variant="body2"
          fontWeight={600}
          color="primary.main"
        >
          {formatDateRange(
            event.startDate,
            event.endDate
          )}
        </Typography>
      </Box>
    </Paper>
  )
}

function CalendarPage() {
  const [
    events,
    setEvents,
  ] = useState([])

  const [
    loading,
    setLoading,
  ] = useState(true)

  const [
    error,
    setError,
  ] = useState('')

  useEffect(() => {
    async function loadCalendar() {
      try {
        setLoading(true)
        setError('')

        const response =
          await fetch(
            '/api/calendar'
          )

        if (!response.ok) {
          throw new Error(
            'No se pudo obtener el calendario académico.'
          )
        }

        const data =
          await response.json()

        setEvents(
          data.events ?? []
        )
      } catch (err) {
        console.error(
          'Error cargando calendario:',
          err
        )

        setError(
          'No se pudo cargar el calendario académico.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadCalendar()
  }, [])

  const {
    nextEvent,
    upcomingEvents,
    pastEvents,
  } = useMemo(() => {
    const today =
      new Date()

    today.setHours(
      0,
      0,
      0,
      0
    )

    const sorted =
      [...events]
        .filter(
          (event) =>
            event.startDate
        )
        .sort(
          (a, b) =>
            new Date(
              `${a.startDate}T00:00:00`
            ) -
            new Date(
              `${b.startDate}T00:00:00`
            )
        )

    /*
     * Un evento sigue vigente mientras su
     * endDate no haya pasado.
     */
    const currentAndUpcoming =
      sorted.filter(
        (event) => {
          const start =
            new Date(
              `${event.startDate}T00:00:00`
            )

          const end =
            event.endDate
              ? new Date(
                  `${event.endDate}T00:00:00`
                )
              : start

          return end >= today
        }
      )

    const past =
      sorted
        .filter(
          (event) => {
            const end =
              event.endDate
                ? new Date(
                    `${event.endDate}T00:00:00`
                  )
                : new Date(
                    `${event.startDate}T00:00:00`
                  )

            return end < today
          }
        )
        .reverse()

    return {
      nextEvent:
        currentAndUpcoming[
          0
        ] ?? null,

      upcomingEvents:
        currentAndUpcoming.slice(
          1
        ),

      pastEvents:
        past,
    }
  }, [events])

  const daysRemaining =
    nextEvent
      ? getDaysRemaining(
          nextEvent
        )
      : null

  return (
    <Box
      sx={{
        display: 'flex',

        flexDirection:
          'column',

        minHeight:
          '100dvh',
      }}
    >
      <Box
        sx={{
          background:
            (theme) =>
              theme.palette.mode ===
              'dark'
                ? 'linear-gradient(160deg, #0F172A 0%, #1a2d45 100%)'
                : 'linear-gradient(160deg, #1E3A5F 0%, #2a5298 100%)',

          px: {
            xs: 2,
            md: 4,
          },

          minHeight: {
            xs: 88,
            md: 96,
          },

          display:
            'flex',

          alignItems:
            'center',
        }}
      >
        <Container
          maxWidth="lg"
          disableGutters
        >
          <Box
            sx={{
              display: 'flex',

              alignItems:
                'center',

              justifyContent:
                'space-between',

              gap: 2,
            }}
          >
            <Box
              sx={{
                display:
                  'flex',

                alignItems:
                  'center',

                gap: 2,
              }}
            >
              <img
                src={
                  unapecLogo
                }

                alt="Logo UNAPEC"

                height={52}

                style={{
                  objectFit:
                    'contain',
                }}
              />

              <Box>
                <Typography
                  variant="h6"
                  fontWeight={
                    700
                  }

                  sx={{
                    color:
                      '#fff',
                  }}
                >
                  Calendario académico
                </Typography>

                <Typography
                  variant="body2"

                  sx={{
                    color:
                      'rgba(255,255,255,0.7)',
                  }}
                >
                  Fechas importantes del calendario académico actual de UNAPEC.
                </Typography>
              </Box>
            </Box>

            <Tooltip
              title="Volver al estimador"
            >
              <IconButton
                component={
                  Link
                }

                to="/"

                sx={{
                  color:
                    'rgba(255,255,255,0.85)',

                  '&:hover':
                    {
                      color:
                        '#fff',

                      bgcolor:
                        'rgba(255,255,255,0.12)',
                    },
                }}
              >
                <i className="fa-solid fa-arrow-left" />
              </IconButton>
            </Tooltip>
          </Box>
        </Container>
      </Box>

      <Container
        maxWidth="lg"

        sx={{
          py: {
            xs: 3,
            md: 4,
          },

          flex: 1,
        }}
      >
        {loading && (
          <Box
            sx={{
              minHeight:
                300,

              display:
                'flex',

              alignItems:
                'center',

              justifyContent:
                'center',
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {!loading &&
          error && (
            <Alert
              severity="error"
            >
              {error}
            </Alert>
          )}

        {!loading &&
          !error && (
            <Stack
              spacing={4}
            >
              {nextEvent && (
                <Paper
                  sx={{
                    p: {
                      xs: 2.5,
                      md: 3,
                    },

                    borderColor:
                      'primary.main',
                  }}
                >
                  <Typography
                    variant="overline"

                    color="primary.main"

                    fontWeight={
                      700
                    }
                  >
                    {nextEvent.status ===
                    'today'
                      ? 'En curso'
                      : 'Próximo evento'}
                  </Typography>

                  <Typography
                    variant="h5"

                    sx={{
                      mt: 0.5,
                    }}
                  >
                    {
                      nextEvent.title
                    }
                  </Typography>

                  <Typography
                    color="text.secondary"

                    sx={{
                      mt: 1,
                    }}
                  >
                    {
                      nextEvent.description
                    }
                  </Typography>

                  <Box
                    sx={{
                      mt: 2,

                      display:
                        'flex',

                      alignItems:
                        'center',

                      gap: 1,

                      flexWrap:
                        'wrap',
                    }}
                  >
                    <Chip
                      icon={
                        <i className="fa-regular fa-calendar" />
                      }

                      label={formatDateRange(
                        nextEvent.startDate,
                        nextEvent.endDate
                      )}
                    />

                    {daysRemaining ===
                      0 && (
                      <Chip
                        label={
                          nextEvent.endDate
                            ? 'En curso'
                            : 'Hoy'
                        }

                        color="primary"
                      />
                    )}

                    {daysRemaining >
                      0 && (
                      <Chip
                        label={`En ${daysRemaining} ${
                          daysRemaining ===
                          1
                            ? 'día'
                            : 'días'
                        }`}

                        color="primary"
                      />
                    )}
                  </Box>
                </Paper>
              )}

              {upcomingEvents.length >
                0 && (
                <Box>
                  <Typography
                    variant="h5"

                    sx={{
                      mb: 2,
                    }}
                  >
                    Próximos eventos
                  </Typography>

                  <Stack
                    spacing={2}
                  >
                    {upcomingEvents.map(
                      (
                        event,
                        index
                      ) => (
                        <EventCard
                          key={`${event.startDate}-${event.endDate}-${event.description}-${index}`}

                          event={
                            event
                          }
                        />
                      )
                    )}
                  </Stack>
                </Box>
              )}

              {pastEvents.length >
                0 && (
                <Box>
                  <Divider
                    sx={{
                      mb: 3,
                    }}
                  />

                  <Typography
                    variant="h5"

                    sx={{
                      mb: 2,
                    }}
                  >
                    Eventos anteriores
                  </Typography>

                  <Stack
                    spacing={
                      1.5
                    }
                  >
                    {pastEvents.map(
                      (
                        event,
                        index
                      ) => (
                        <Box
                          key={`${event.startDate}-${event.endDate}-${event.description}-${index}`}

                          sx={{
                            opacity:
                              0.72,
                          }}
                        >
                          <EventCard
                            event={
                              event
                            }

                            compact
                          />
                        </Box>
                      )
                    )}
                  </Stack>
                </Box>
              )}

              {!nextEvent &&
                upcomingEvents.length ===
                  0 &&
                pastEvents.length ===
                  0 && (
                  <Alert
                    severity="info"
                  >
                    No hay eventos disponibles en el calendario académico actual.
                  </Alert>
                )}
            </Stack>
          )}
      </Container>
    </Box>
  )
}

export default CalendarPage