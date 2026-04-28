const readPublicValue = (value: unknown): string => {
  return typeof value === "string" ? value.trim() : "";
};

export type LandingConfig = {
  leadFormAction: string;
  leadFormProvider: string;
  calendarUrl: string;
  analyticsProvider: string;
  isLeadCaptureConfigured: boolean;
  isCalendarConfigured: boolean;
};

const leadFormAction = readPublicValue(import.meta.env.PUBLIC_LEAD_FORM_ACTION);
const calendarUrl = readPublicValue(import.meta.env.PUBLIC_CALENDAR_URL);

export const landingConfig: LandingConfig = {
  leadFormAction,
  leadFormProvider: readPublicValue(import.meta.env.PUBLIC_LEAD_FORM_PROVIDER) || "manual",
  calendarUrl,
  analyticsProvider: readPublicValue(import.meta.env.PUBLIC_ANALYTICS_PROVIDER) || "none",
  isLeadCaptureConfigured: Boolean(leadFormAction),
  isCalendarConfigured: Boolean(calendarUrl),
};
