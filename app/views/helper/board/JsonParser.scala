package views.helper.board

import java.io.FileInputStream
import play.api.libs.json._

object JsonParser {
  private val JSON_PATH = "app/assets/board/boardDefinition.json"
  private val NODE_MODEL_JUNCTION = "MODEL_JUNCTION"
  private val NODE_MODEL_CONNECTOR = "MODEL_CONNECTOR"

  implicit private val quaternionFormat = Json.format[Quaternion]
  implicit private val vectorFormat = Json.format[Position]
  implicit private val ModelJunctionFormat = Json.format[ModelJunction]
  implicit private val ModelConnectorFormat = Json.format[ModelConnector]

  private val stream = new FileInputStream(JSON_PATH)

  private val json = try {
    Json.parse(stream)
  } finally {
    stream.close()
  }

  private val modelJunction = (json \ NODE_MODEL_JUNCTION).get
  private val modelConnector = (json \ NODE_MODEL_CONNECTOR).get

  var modelJunctionList = Json.fromJson[List[ModelJunction]](modelJunction).get
  var modelConnectorList = Json.fromJson[List[ModelConnector]](modelConnector).get
}