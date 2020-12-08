import tpl_background_logo from '../../templates/background_logo.js';
import tpl_chat from 'plugins/chatview/templates/chat.js';
import tpl_controlbox from 'plugins/controlbox/templates/controlbox.js';
import tpl_muc from 'plugins/muc-views/templates/muc.js';
import { render } from 'lit-html';
import { api, _converse } from '@converse/headless/core';
import ElementView from '@converse/skeletor/src/element';


class ConverseChats extends ElementView {

    initialize () {
        this.listenTo(this.model, 'destroy', this.render);
        this.listenTo(this.model, 'add', this.render);

        const bg = document.getElementById('conversejs-bg');
        if (bg && !bg.innerHTML.trim()) {
            render(tpl_background_logo(), bg);
        }
        const body = document.querySelector('body');
        body.classList.add(`converse-${api.settings.get('view_mode')}`);
        this.render();
    }

    render () {
        const { chatboxes, CONTROLBOX_TYPE, CHATROOMS_TYPE } = _converse;
        if (chatboxes.length > 0) {
            debugger;
        }
        const templates = chatboxes.map(m => {
            if (m.get('type') === CONTROLBOX_TYPE) {
                return tpl_controlbox(m);
            } else if (m.get('type') === CHATROOMS_TYPE) {
                return tpl_muc(m);
            } else {
                return tpl_chat(m);
            }
        });
        render(templates, this);
    }

    closeAllChatBoxes () {
        return Promise.all(Array.from(this.children).map(v => v.close({ 'name': 'closeAllChatBoxes' })));
    }
}

api.elements.define('converse-chats', ConverseChats);
