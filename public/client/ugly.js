/******* This file has been UGLIFIED! ********/window.Shortly=Backbone.View.extend({template:Templates.layout,events:{"click li a.index":"renderIndexView","click li a.create":"renderCreateView"},initialize:function(){console.log("Shortly is running"),$("body").append(this.render().el),this.router=new Shortly.Router({el:this.$el.find("#container")}),this.router.on("route",this.updateNav,this),Backbone.history.start({pushState:!0})},render:function(){return this.$el.html(this.template()),this},renderIndexView:function(a){a&&a.preventDefault(),this.router.navigate("/",{trigger:!0})},renderCreateView:function(a){a&&a.preventDefault(),this.router.navigate("/create",{trigger:!0})},updateNav:function(a){this.$el.find(".navigation li a").removeClass("selected").filter("."+a).addClass("selected")}}),Shortly.Link=Backbone.Model.extend({urlRoot:"/links"}),Shortly.Links=Backbone.Collection.extend({model:Shortly.Link,url:"/links"}),Shortly.LinkView=Backbone.View.extend({className:"link",template:Templates.link,render:function(){return this.$el.html(this.template(this.model.attributes)),console.log(this.model),this}}),Shortly.LinksView=Backbone.View.extend({className:"links",initialize:function(){this.collection.on("sync",this.addAll,this),this.collection.fetch()},render:function(){return this.$el.empty(),this},addAll:function(){this.collection.forEach(this.addOne,this)},addOne:function(a){var b=new Shortly.LinkView({model:a});this.$el.append(b.render().el)}}),Shortly.createLinkView=Backbone.View.extend({className:"creator",template:Templates.create,events:{submit:"shortenUrl"},render:function(){return this.$el.html(this.template()),this},shortenUrl:function(a){a.preventDefault();var b=this.$el.find("form .text"),c=new Shortly.Link({url:b.val()});c.on("request",this.startSpinner,this),c.on("sync",this.success,this),c.on("error",this.failure,this),c.save({}),b.val("")},success:function(a){this.stopSpinner();var b=new Shortly.LinkView({model:a});this.$el.find(".message").append(b.render().$el.hide().fadeIn())},failure:function(a,b){return this.stopSpinner(),this.$el.find(".message").html("Please enter a valid URL").addClass("error"),this},startSpinner:function(){this.$el.find("img").show(),this.$el.find("form input[type=submit]").attr("disabled","true"),this.$el.find(".message").html("").removeClass("error")},stopSpinner:function(){this.$el.find("img").fadeOut("fast"),this.$el.find("form input[type=submit]").attr("disabled",null),this.$el.find(".message").html("").removeClass("error")}}),Shortly.Router=Backbone.Router.extend({initialize:function(a){this.$el=a.el},routes:{"":"index",create:"create"},swapView:function(a){this.$el.html(a.render().el)},index:function(){var a=new Shortly.Links,b=new Shortly.LinksView({collection:a});this.swapView(b)},create:function(){this.swapView(new Shortly.createLinkView)}});