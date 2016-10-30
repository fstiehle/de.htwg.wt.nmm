package views.helper.x3dom

import java.io.FileInputStream
import play.api.libs.json._


object JsonParser {

  // INIT
  implicit private val quaternionFormat = Json.format[Quaternion]
  implicit private val vectorFormat = Json.format[Vector]
  implicit private val x3dModelBaseFormat = Json.format[x3dModelBase]
  implicit private val x3dModelConnectorFormat = Json.format[x3dModelConnector]

  private val stream = new FileInputStream("app/assets/x3dom/x3dDefinition.json")

  private val json = try {
    Json.parse(stream)
  } finally {
    stream.close()
  }

  private val modelBase = (json \ "MODEL_BASE").get
  private val modelConn = (json \ "MODEL_CONNECTOR").get

  val modelBaseList = Json.fromJson[List[x3dModelBase]](modelBase).get
  val modelConnList = Json.fromJson[List[x3dModelConnector]](modelConn).get
}