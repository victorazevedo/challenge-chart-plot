// Messages to show to user
export const MessageConstants = {
    EMPTY_JSON: "Could process an empty JSON",
    INVALID_ATTRIBUTE_TYPE: "The attribute type is not valid!",
    MISSING_TYPE: "Missing 'type' attribute!",
    MISSING_TYPE_INDEX: "Missing 'type' attribute in element: ",
    MISSING_TIMESTAMP_INDEX: "Missing 'timestamp' attribute in element: ",
    EMPTY_DATA: "Could not process empty data",
    INTERNAL_ERROR: "Could not process your request",
    EVENT_NOT_MAPPED: "Event 'type' not mapped in process. Not listed in domain: 'start, stop, span, data' ",
    DATASET_BIG: "Dataset input is too big. Please use a data with less than follow JSON quantity: ",
    PARSE_ERROR: 'Error parsing invalid JSON. The right format is: {"property":"value"}',
    GROUP_SELECT: "Attribute 'group' or 'select' not defined"
}