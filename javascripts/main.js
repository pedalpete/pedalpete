var Resume = {
	Models: {},
    Views: {},
    Routers: {},
    Collections: {},
    init: function() {
  		this.render();
  	},
  	
	render: function(){

	var router = new Resume.Routers.Start;
        Backbone.history.start();
		
	}
  }


Resume.Routers.Start = Backbone.Router.extend({
	routes: {
		"resume": "resume",
		"recommendations/:name":"recommendations",
		"recommendations": "recommendations",
		"contact":"contact",
		"": "resume"
	},

	resume: function(){
		new Resume.Views.Resume();
		new Resume.Views.RelevantSkills();
		this.location_hash();
	},
	recommendations: function(name){
		new Resume.Views.RecommendationsList();
		if(name==undefined){
			var letter = Resume.letters.first();
			
		} else {
			var letter = Resume.letters.get(name);
		}
		new Resume.Views.Recommendation_Letter({model: letter});
	

		this.location_hash();
	},

	contact: function(){
		new Resume.Views.Contact();
		this.location_hash();
	},

	location_hash: function(){
            $('.active').removeClass('active');
            if(location.hash==''){
            	location.hash='#resume';
            }
           $('a[href="'+location.hash+'"]').parent().addClass('active');
      }
	
});

Resume.Models.Job = Backbone.Model.extend({

});

Resume.Collections.Jobs = Backbone.Collection.extend({
	model: Resume.Models.Job

});

Resume.jobs = new Resume.Collections.Jobs([{"title":"Data Management Architect &amp; Developer", "company":"Bravo Media", "dates":"6 Months - May 2011 to Oct 2011","description":"Gathered business requirements, and envisioned a solution to painstaking highly labour intensive data management system for online retailer. Delivered a web-based solution resulting in 75% reduction in processing time and considerable accuracy improvement. Very well received by employees and management."},
											{"title": "Founder & Developer", "company": "HearWhere & ZiFiMusic", "dates" : "3 Years, 7 Months - June 2007 to Dec 2010", "description": "Taught myself to code resulting in development of the world's largest concert database and search engine with more than 8 million concerts. Developed artists popularity alghorithm for recommending best touring artists by region. Developed high-availability API serving and licensed capabilities to Maxim magazines Blender.com, was considered by Playlist.com, Kazaa.com, MetroLyrics and more."},
											{"title":"Mobile Strategy Consultant, Product Manager", "company": "MusicIp", "dates":"7 Months - Oct 2005 to May 2006", "description":"Developed technology strategy and recommendations for placing acoustic matching technology on phones. Product Managed web-properties for licensee self-service, support, as well as critically acclaimed 'playground' music discovery web-app."},
											{"title": "Product Manager / Project Manager / Knowledge Architect", "company": "Intrawest", "dates": "1 Year, 9 Months - Oct 2001 to June 2003", "description":"Developed vision and managed development of cutting-edge company wide knowledge management system for company of 24,000. Vision and management of successful proof-of-concept development for company-wide HR review system."}]);


Resume.Views.Resume = Backbone.View.extend({
 el: 'div#main',
 initialize: function(){
 	$(this.el).empty();
 	this.render();
 },
 render: function(){
  	Resume.jobs.each(this.add);
 },

 add: function(job){
 
 	var template = _.template( $("#jobs_template").html(), job.attributes);
 	$('div#main').append(template);
 }
});


Resume.Models.Recommendation = Backbone.Model.extend({});
Resume.Collections.Recommendations = Backbone.Collection.extend({
	models: Resume.Models.Recommendation
});
Resume.Views.RecommendationsList = Backbone.View.extend({
	el: 'span#sub_nav',
	initialize: function(){
		$(this.el).empty();
		this.render();
	},
	render: function(){
		Resume.letters.each(this.add);
	
	},
	add: function(letter){

		$('span#sub_nav').append('<li><a href=#recommendations/'+letter.attributes.id+'>'+letter.attributes.from+'<br/>'+letter.attributes.position+'</li>');
	}
});
Resume.Views.Recommendation_Letter = Backbone.View.extend({
	el: 'div#main',
	initialize: function(){
		this.render();
	},
	render: function(){

		$(this.el).html(this.model.attributes.letter);
		// update the sidenav to show active letter
		$('a[href="#recommendations/'+this.model.attributes.id+'"]').parent().addClass('shown');
		
	}
});

Resume.letters = new Resume.Collections.Recommendations([{"id":"matthew_dunn","from":"Matthew Dunn", "position":"CIO - Intrawest Corp.",
		"letter":"To Whom It May Concern<br/><br/> October 6, 2003<br/><br/>Several years ago an unsolicited proposal arrived at the office of the CIO for Intrawest Corporation. The proposal described an opportunity to improve the company’s already best-of-breed customer service in its resort operations business by making information assets already in existence accessible to employees.  I recall being struck in particular by two things.  One was the maturity of architectural vision in the proposal; the writer recognized that the product information in point-of-sale systems embodied critical definitions about the resort business at any point of time, and consequently that this information could and should provide a coherent basis for service information. The second thing was the approach: the writer, an employee at Copper Mountain resort in Colorado, had the vision to outline a problem and a solution that would benefit the company broadly.<br/><br/>As a result of that, Pete Field was brought to Intrawest’s corporate headquarter and asked to spearhead an enterprise knowledge platform project.  The purpose of this letter is to provide my positive perspective on Pete’s abilities and accomplishments on that project, and to offer to provide further reference for him should it prove helpful to him.<br/><br/>Pete took charge of the ‘IWeb’ project, as it was called, and in the nearly two years he managed the project, combined the vision that his proposal had promised with attention to detail, persistence, and an outstanding work ethic to produce an innovative solution to the company’s needs.  In the course of the project, he also encountered most of the pitfalls that can make enterprise solution development so frustrating. He’s to be especially complimented for grinding through all those frustrations unflappably. As CIO, I was more closely involved with the iWeb project than most projects, but never doubted that Pete was the right person to head it up.<br/><br/>I would characterize Pete’s thinking on the iWeb project as being commercial software caliber work.  He spent considerable time on the difficult early work of analyzing the real challenges of knowledge and information management in the unique environment of that company and business, and envisioned an elegant, usable solution to those challenges. He evaluated commercial technologies and identified an appropriate, cost-effective solution, negotiating an extremely favorable price for Intrawest in the process. And he project-managed the undertaking through a very long gestation to a successful internal launch.<br/><br/>As a result, he’s got a skillset that I’ve only seen in Microsoft program managers; able to see the business, user, and technical sides of a solution simultaneously, and doggedly pursue it to completion. <br/><br/>Pete has vision and, probably more vitally, the grit to pursue it.  I’m sure he would say he learned a host of lessons on the iWeb project that would make him even more effective today.  I think Pete has the makings of a successful entrepreneur, especially in the areas of innovation which interest him so keenly.  He also has an unusual degree of patience and a perspective on his own work that is refreshing.  He expects himself to do big things. So do I.<br/><br/>If I can provide any further perspective on Pete, please do not hesitate to contact me.<br/><br/>Matthew Dunn<br/><br/>President, Socratech, Inc.  (Former CIO, Intrawest Corporation)"},
		{"id":"greg_whelan","from":"Greg Whelan","position":"GM - Bravo Business Media","letter":"a bunch of text from greg"}]);


Resume.Views.RelevantSkills = Backbone.View.extend({
	el: 'span#sub_nav',
	initialize: function(){
		this.render();
	},
	render: function(){
		$(this.el).html('<li class="nav-header"><h3>Relevant Skills<br/>&amp; Characteristics</h3></li><li>Product Management</li><li>Business Planning</li><li>Vision & Strategy</li><li>Usability & Design</li><li>People Person</li><li>Follow Through</li><li>Developer</li>');
	}    
	
});

Resume.Views.Contact = Backbone.View.extend({
	el: 'div#main',
	initialize: function(){
		this.render();
	},


	render: function(){

		$(this.el).html('<div id="contact"><div id="email">e-mail: <a id="mailto">pete[at_addr]kitchon[d]com</a></div><div id="phone">phone: +[g]61 [g] 478 71[g]5 8[g]07</div>');
		//fix email
		$('a#mailto',this.el).each(function(){
			 var email = $(this).text().split('[at_addr]').join('@').split('[d]').join('.');
 			$(this).attr('href', 'mailto:' + email.toLowerCase()).text(email);
		});	
		$('div#phone',this.el).each(function(){
			$(this).text($(this).text().split('[g]').join(''));

		});

	}
});