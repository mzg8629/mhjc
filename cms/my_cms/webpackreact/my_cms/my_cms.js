var React = require('react');
var reactRedux = require('react-redux')
require("./my_cms.css");
var Redux=require("redux");
var actions=require("../../redux/actions.js");
var Tree=require("../../../../react/tree_react/my_cms_tree.js");
var Nav=require("../../../../react/nav/my_cms_nav.js");
var Codeeditor=require("../../../../react/codeeditor/codeeditor.js");
var Tab=require("../../../../react/tabs/my_cms_tabComtent.js");

var connect=reactRedux.connect,provider =reactRedux.Provider;
//<Codeeditor opt={codeopt}></Codeeditor> <Tab></Tab>
class my_cms extends React.Component{
    constructor (){
        super()
    }

    menuClick(){
        this.props.menuClick('none',0,0);
    }
    render(){

        let codeopt={selectFile:this.props.selectFile},menuClick=this.menuClick;;
        return(
            <div onClick={menuClick.bind(this)} className="home">
                <div className="nav" id="nav">
                    <Nav></Nav>
                </div>
                <div className="main">
                    <div  className="left" id="left">
                        <Tree></Tree>
                    </div>
                    <div  className="coment" >
                        <Tab opt={codeopt}></Tab>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps =function (state) {
    return {
        selectFile:state.treeCounter.selectFile

    }
}

const mapDispatchToProps = function(dispatch ,ownProps) {
    return {
        menuClick:function(display,left,top){
            dispatch({type:'showMenu',display:display,left:left,top:top});
        }
    }
}

var mycms=connect(
    mapStateToProps,
    mapDispatchToProps
)(my_cms);
//export default navcon;
module.exports =mycms;