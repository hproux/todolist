export default class Todo {
  constructor(title="",content="", done=false,uuid="") {
    this.title = title;
    this.content = content;
    this.done = done;
    this.uuid = uuid;
  }
}
