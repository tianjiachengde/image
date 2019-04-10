import { mount } from "vue-test-utils";
import imageCom from '@/components/image-screen-shoot/imageScreenShoot'

describe('counter',() => {
    const propsData = {
        width:200,
        height:200,
        url:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    };
    it('init right',() => {
        //given
        //when
        const wrapper = mount(imageCom,{propsData:propsData});
        //then
        expect(wrapper.props()).toBe(propsData)
    })

    it('the select area is show when borderIsShow is true',() => {
        const wrapper = mount(imageCom,{propsData:propsData});
        wrapper.setData({borderIsShow:true});
        expect(wrapper.contains('div div #select-area')).toEqual(true);
    })

    it('first mousedown the select area is show', () => {
        //given
        const wrapper = mount(imageCom,{propsData:propsData});
        wrapper.setData({mouseEvenStatus:''});
        //when
        const root = wrapper.find('div div');
        root.trigger('mousedown');
        //then
        expect(wrapper.vm.mouseEvenStatus).toEqual('down')
        expect(wrapper.contains('div div #select-area')).toEqual(true);
    })

    it('the select area and function-menu is show when first mouseup',() => {
        //given
        const wrapper = mount(imageCom,{propsData:propsData});
        //when
        wrapper.setData({mouseEvenStatus:'down'})
        const root = wrapper.find('div div');
        root.trigger('mouseup');
        //then
        expect(wrapper.vm.mouseEvenStatus).toEqual('up');
    })

    it('init data when trigger cancel function',() => {
        //given
        const wrapper = mount(imageCom,{propsData:propsData});
        const cancelMethod = () => 'a';
        wrapper.setMethods({cancel: cancelMethod});
        //when
        wrapper.setData({mouseEvenStatus:'up'});
        const root = wrapper.find('div .function-menu img');
        root.trigger('click');
        //then
        expect(cancelMethod.call()).toEqual("a");
    })
})
