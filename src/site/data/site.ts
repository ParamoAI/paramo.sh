/*
  Site-wide switches for sections that are built but not ready to go live.
  Each is tracked in Jira (Dennis Tasks, under "Finish the Páramo website").
*/

// The Events page (/events/) and every link to it: the menu, the footer,
// and the events section and button on the Why us page. The page itself is
// kept as is, so it can be previewed at /events/ and switched back on.
export const SHOW_EVENTS = false

// Draft notes and "To add" / "To write" spots: the draft labels on Why us,
// the dance event spots, Adrian's bio, the Storage Advisors video box.
// Off for the live site so nothing unfinished shows; switch on to see what
// is still missing. Tracked in Jira under "Finish the Páramo website".
export const SHOW_DRAFTS = false
