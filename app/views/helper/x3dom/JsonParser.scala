package views.helper.x3dom

import java.io.FileInputStream
import play.api.libs.json._


object JsonParser {
  private val JSON_PATH = "app/assets/x3dom/x3dDefinition.json"
  private val NODE_MODEL_BASE = "MODEL_BASE"
  private val NODE_MODEL_CONN = "MODEL_CONNECTOR"

  implicit private val quaternionFormat = Json.format[Quaternion]
  implicit private val vectorFormat = Json.format[Vector]
  implicit private val x3dModelBaseFormat = Json.format[x3dModelBase]
  implicit private val x3dModelConnectorFormat = Json.format[x3dModelConnector]

  private val stream = new FileInputStream(JSON_PATH)

  private val json = try {
    Json.parse(stream)
  } finally {
    stream.close()
  }

  private val modelBase = (json \ NODE_MODEL_BASE).get
  private val modelConn = (json \ NODE_MODEL_CONN).get

  var modelBaseList = Json.fromJson[List[x3dModelBase]](modelBase).get
  var modelConnList = Json.fromJson[List[x3dModelConnector]](modelConn).get
}