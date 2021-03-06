function Register(container, btnContainer) {
	this.container = container;
    this.btnContainer = btnContainer;
	this.createDom();
    this.bindEvents();
}

Register.Template = `
	<div class="modal fade" id="registerModel" role="dialog" aria-labelledby="registerLabel">
 		<div class="modal-dialog" role="document">
    		<div class="modal-content">
      			<div class="modal-header">
        			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
        				<span aria-hidden="true">&times;</span>
        			</button>
        			<h4 class="modal-title" id="registerLabel">注册</h4>
      			</div>
      			<div class="modal-body">
        			<form>
				    	<div class="form-group">
				        	<label for="username" class="control-label">用户名</label>
				        	<input type="text" class="form-control" id="username">
				    	</div>
          				<div class="form-group">
            				<label for="password" class="control-label">密码</label>
            				<input type="password" class="form-control" id="password">
          				</div>
        			</form>
      			</div>
				<div class="modal-footer">
        			<button type="button" id="registerBtn" class="btn btn-primary">注册</button>
      			</div>
                <div style="margin:20px;" class="alert hide alert-success" id="successNotice">恭喜您注册成功！</div>
                <div style="margin:20px;" class="alert hide alert-danger" id="errorNotice">sorry, 用户名已被注册</div>
    		</div>
  		</div>
	</div>
`;

$.extend(Register.prototype, {

	createDom: function() {
        this.btnContainer.append('<li><a href="#" data-toggle="modal" data-target="#registerModel">注册</a></li>');
        this.element = $(Register.Template);
        this.noticeElem = this.element.find("#successNotice");
        this.errNoticeElem = this.element.find("#errorNotice");
		this.container.append(this.element);
	},

    bindEvents: function() {
        var registerBtn = this.element.find("#registerBtn");
        registerBtn.on("click", $.proxy(this.handleRegisterBtnClick, this));
        var userElem = this.element.find("#username");
        userElem.on("focus", $.proxy(this.handleUsernameFocus, this));
    },

    handleRegisterBtnClick: function() {
        var username = this.element.find("#username").val(),
            password = this.element.find("#password").val();
        
        $.ajax({
            type: "post",
            url: "/api/user/register",
            data: {
                username: username,
                password: password
            },
            success: $.proxy(this.handleRegisterSucc, this)
        })
    },

    handleRegisterSucc: function(res) {
        if (res.data.register) {
            this.noticeElem.removeClass('hide');
            setTimeout($.proxy(this.succCloseModal, this), 5000)
        }else {
            this.errNoticeElem.removeClass('hide');
        }
    },

    succCloseModal: function() {
        this.noticeElem.addClass('hide');
        this.element.modal('hide');
    },

    handleUsernameFocus: function() {
        this.errNoticeElem.addClass('hide');
    }
})

