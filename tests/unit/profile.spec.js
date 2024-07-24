// ProfileView.spec.js
import { shallowMount } from '@vue/test-utils';
import ProfileView from '@/views/ProfileView.vue';

describe('ProfileView', () => {
    it('muestra el nombre y el email del usuario si está autenticado', () => {
        const user = {
            name: 'Carlos Sotos',
            email: 'carlos@gmail.com',
        };

        const wrapper = shallowMount(ProfileView, {
            computed: {
                user: () => user,
            },
        });

        expect(wrapper.text()).toContain(`Nombre: ${ user.name }`);
        expect(wrapper.text()).toContain(user.email);
    });

    it('muestra un mensaje si el usuario no está autenticado', () => {
        const wrapper = shallowMount(ProfileView, {
            computed: {
                user: () => null,
            },
        });

        expect(wrapper.text()).toContain('Usted no cuenta con una sesión activa.');
    });
});