package views.x3dom

import java.io.FileInputStream
import play.api.libs.json._
import helper.math.Quaternion
import helper.math.Vector


object JsonParser extends App {

  implicit val quaternionFormat = Json.format[Quaternion]
  implicit val vectorFormat = Json.format[Vector]
  implicit val x3dModelBaseFormat = Json.format[x3dModelBase]
  implicit val x3dModelConnectorFormat = Json.format[x3dModelConnector]

  val stream = new FileInputStream("app/views/x3dom/x3dDefinition.json")
  val json = try {  Json.parse(stream) } finally { stream.close() }

  val modelBase = (json \ "MODEL_BASE").get
  val modelBaseList = Json.fromJson[Seq[x3dModelBase]](modelBase)

  val modelConn = (json \ "MODEL_CONNECTOR").get
  val modelConnList = Json.fromJson[Seq[x3dModelConnector]](modelConn)

  println(modelBaseList)
  println(modelConnList)


}