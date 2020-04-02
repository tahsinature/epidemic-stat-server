module.exports = {
  success: (res, data) => res.status(200).json({ success: true, data }),
  serverError: (res, flag, message = "Internal Server Error") => res.status(500).json({ success: false, flag, message }),
  badRequest: (res, flag, message = "Bad Request") => res.status(400).json({ success: false, flag, message }),
  notFound: (res, flag, message = "Data Not Found") => res.status(404).json({ success: false, flag, message }),
  unauthorized: (res, flag, message = "Unauthorized Action") => res.status(401).json({ success: false, flag, message }),
  forbidden: (res, flag, message = "Action Forbidden") => res.status(403).json({ success: false, flag, message })
};
