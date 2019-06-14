const render = ReactDOM.render;
const Component = React.Component;

class MainLayout extends Component {
  constructor() {
    super();
    this.addTodoList = this.addTodoList.bind(this);
    this.renderTodoListTable = this.renderTodoListTable.bind(this);
    this.showEditHandler = this.showEditHandler.bind(this);
    this.updateTodoHandler = this.updateTodoHandler.bind(this);
    this.state = {
      todoListTable: [],
      showEditTable: false,
      editTableIndex: 0 };

  }

  updateTodoHandler(index, newContent) {
    const todoListTable = this.state.todoListTable;
    delete todoListTable[index];
    todoListTable[index] = newContent;
    this.setState({
      todoListTable: todoListTable });

  }



  showEditHandler(index, showOrHide) {
    this.setState({
      editTableIndex: index,
      showEditTable: showOrHide });

    console.log(index);

  }
  addTodoList(newTodo) {
    var todoListTable = this.state.todoListTable;
    todoListTable.push(newTodo);
    this.setState({
      todoListTable: todoListTable });


    console.log("todoListTable", this.state.todoListTable);
  }

  renderTodoListTable() {
    return this.state.todoListTable.map((detail, index) => {
      return (
        React.createElement(TodoListTable, { showEditHandler: this.showEditHandler, index: index, key: index, details: detail }));

    });
  }


  render() {
    return (
      React.createElement("section", null,
      React.createElement(NewTodoList, { addTodoList: this.addTodoList }),
      React.createElement("section", { className: "card-deck-wrapper" },
      React.createElement("section", { className: "card-deck" },
      this.renderTodoListTable())),


      React.createElement(EditListTable, { showEditHandler: this.showEditHandler, updateTodoHandler: this.updateTodoHandler, details: this.state.showEditTable ? this.state.todoListTable[this.state.editTableIndex] : {}, showEditTable: this.state.showEditTable, index: this.state.editTableIndex }),
      React.createElement("pre", null,

      JSON.stringify(this.state, null, 2))));



  }}


class TodoListTable extends Component {
  constructor() {
    super();
    this.renderTodoContent = this.renderTodoContent.bind(this);
    this.cardHandler = this.cardHandler.bind(this);
  }
  cardHandler() {
    this.props.showEditHandler(this.props.index, true);
  }
  renderTodoContent() {
    return Object.keys(this.props.details.todoItem).map((item, index) => {
      return (
        React.createElement("li", { key: index, className: "list-group-item" },
        this.props.details.todoItem[item]));


    });
  }
  render() {
    return (
      React.createElement("div", { className: "card", onClick: this.cardHandler },
      React.createElement("div", { className: "card-block" },
      React.createElement("h4", { className: "card-title" }, this.props.details.title)),

      React.createElement("ul", { className: "list-group list-group-flush" },
      this.renderTodoContent())));



  }}


class EditListTable extends Component {
  constructor() {
    super();
    this.renderTodoContent = this.renderTodoContent.bind(this);
    this.doneEditTable = this.doneEditTable.bind(this);
    this.cancelEditTable = this.cancelEditTable.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderExtraInput = this.renderExtraInput.bind(this);
    this.addNewInput = this.addNewInput.bind(this);
    this.state = {
      extraInput: 1 };

  }

  addNewInput(e) {
    console.log(e.target.getAttribute('data-index'));
    console.log(this.state.extraInput);
    if (e.target.getAttribute('data-index') == this.state.extraInput - 1) {
      var extraInput = this.state.extraInput;
      this.setState({
        extraInput: ++extraInput });

    }

  }
  renderExtraInput() {
    var todoItemLength = Object.keys(this.props.details.todoItem).length;
    var extraInp = [];
    var i = 0;
    while (i < this.state.extraInput) {
      extraInp.push(React.createElement("input", { key: i, "data-index": i, ref: "todoItem" + todoItemLength, onKeyDown: this.addNewInput, className: "list-group-item" }));
      todoItemLength++;
      i++;
    }

    return (
      React.createElement("p", null,
      extraInp));


  }

  cancelEditTable() {
    this.props.showEditHandler(0, false);
    this.setState({
      extraInput: 1 });


  }

  doneEditTable() {
    var newContent = {};
    newContent.title = this.refs.cardTitle.value;
    var todoItemLength = Object.keys(this.props.details.todoItem).length;
    newContent.todoItem = {};

    for (var i = 0; i < todoItemLength; i++) {
      if (this.refs['todoItem' + i].value !== '') {
        newContent.todoItem['todoItem' + i] = this.refs['todoItem' + i].value;
      }
    }

    var extraInput = this.state.extraInput;
    //Adding Extra List Added
    for (var j = 0; j < extraInput - 1; j++) {

      if (this.refs['todoItem' + todoItemLength].value !== '') {
        console.log("NewItem", this.refs['todoItem' + todoItemLength].value);
        newContent.todoItem['todoItem' + todoItemLength] = this.refs['todoItem' + todoItemLength].value;

      }
      todoItemLength++;
    }
    console.log("newContent", newContent);
    this.props.updateTodoHandler(this.props.index, newContent);
    this.cancelEditTable();

  }


  renderTitle() {
    return (
      React.createElement("input", { className: "card-title", ref: "cardTitle", defaultValue: this.props.details.title }));

  }

  renderTodoContent() {
    return Object.keys(this.props.details.todoItem).map((item, index) => {
      return (
        React.createElement("input", { key: index, ref: "todoItem" + index, className: "list-group-item", defaultValue: this.props.details.todoItem[item] }));

    });
  }

  render() {
    return (
      React.createElement("section", { className: this.props.showEditTable ? "cardWrapper" : "hide" },
      React.createElement("div", { className: "card modal-card" },
      React.createElement("div", { className: "card-block" },
      this.props.showEditTable ? this.renderTitle() : null),

      React.createElement("ul", { className: "list-group list-group-flush" },
      this.props.showEditTable ? this.renderTodoContent() : null,
      this.props.showEditTable ? this.renderExtraInput() : null),

      React.createElement("button", { onClick: this.doneEditTable }, "Done"),
      React.createElement("button", { onClick: this.cancelEditTable }, "Cancel"))));



  }}




class NewTodoList extends Component {
  constructor() {
    super();
    this.addNewItem = this.addNewItem.bind(this);
    this.incTodoList = this.incTodoList.bind(this);


    this.state = {
      todoListCount: 0 };


  }

  incTodoList(e) {
    e.persist();
    const lastItem = e.target.getAttribute('data-lastItem');

    if (lastItem) {
      var todoListCount = this.state.todoListCount;
      this.setState({
        todoListCount: ++todoListCount });

    }
  }



  addNewItem(e) {
    e.preventDefault();
    const listContent = {};

    var count = this.state.todoListCount;
    for (var i = 0; i <= count; i++) {
      var content = this.refs.todoList.refs['todoItem' + i];
      content.value && (listContent['todoItem' + i] = content.value);
    }

    var newTodoList = Object.assign({}, { "title": this.refs.textArea.value }, { "todoItem": listContent });
    console.log(newTodoList);
    this.props.addTodoList(newTodoList);

    //Reset 
    this.setState({
      todoListCount: 0 });

    //Resetting the form 
    this.refs.form.reset();
  }


  render() {
    return (
      React.createElement("div", { className: "row" },
      React.createElement("section", { className: "col-md-4 col-md-offset-4" },
      React.createElement("form", { ref: "form", onSubmit: this.addNewItem },
      React.createElement("textarea", { ref: "textArea" }),
      React.createElement(TodoList, { ref: "todoList", incTodoList: this.incTodoList, count: this.state.todoListCount }),
      React.createElement("button", { type: "submit" }, "Submit")))));




  }}


class TodoList extends Component {

  render() {
    var listItem = [];
    for (var i = 0; i <= this.props.count; i++) {
      listItem.push(React.createElement("input", { key: i, "data-lastItem": i >= this.props.count ? true : '', onKeyPress: this.props.incTodoList, ref: "todoItem" + i, type: "text" }));
    }
    return (
      React.createElement("div", null,
      listItem));


  }}


render(React.createElement(MainLayout, null), document.querySelector('#app'));