{
  "name": "MoveRequest",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Client full name"
    },
    "email": {
      "type": "string",
      "description": "Client email"
    },
    "phone": {
      "type": "string",
      "description": "Client phone"
    },
    "move_type": {
      "type": "string",
      "enum": [
        "residential",
        "commercial",
        "long_distance",
        "storage"
      ],
      "description": "Type of move"
    },
    "move_date": {
      "type": "string",
      "format": "date",
      "description": "Preferred move date"
    },
    "details": {
      "type": "string",
      "description": "Additional details"
    },
    "status": {
      "type": "string",
      "enum": [
        "new",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled"
      ],
      "default": "new",
      "description": "Request status"
    },
    "origin": {
      "type": "string",
      "description": "Pickup address"
    },
    "destination": {
      "type": "string",
      "description": "Delivery address"
    },
    "estimated_price": {
      "type": "number",
      "description": "Estimated price in CAD"
    },
    "notes": {
      "type": "string",
      "description": "Internal admin notes"
    },
    "checklist": {
      "type": "object",
      "description": "Admin checklist items",
      "properties": {
        "quote_sent": {
          "type": "boolean",
          "default": false
        },
        "deposit_received": {
          "type": "boolean",
          "default": false
        },
        "crew_assigned": {
          "type": "boolean",
          "default": false
        },
        "truck_booked": {
          "type": "boolean",
          "default": false
        },
        "client_confirmed": {
          "type": "boolean",
          "default": false
        }
      }
    }
  },
  "required": [
    "name",
    "email"
  ]
}