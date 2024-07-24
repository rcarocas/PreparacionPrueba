import { shallowMount } from '@vue/test-utils';
import ProfileView from '@/views/ProfileView.vue';
import userService from '@/services/userService.js';

// Mock de la función getUser del servicio userService
jest.mock('@/services/userService.js', () => ({
  getUser: jest.fn(),
}));

describe('ProfileView.vue', () => {
  it('muestra el nombre de usuario cuando se monta el componente', async () => {
    // Define el comportamiento del mock
    userService.getUser.mockResolvedValue({
        name: 'John Doe',
        email: 'john@example.com',
    });

    const wrapper = shallowMount(ProfileView);

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(wrapper.text()).toContain(user.name);
    expect(wrapper.text()).toContain(user.email);
  });
});