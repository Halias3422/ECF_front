import Hero from '@/components/Hero/Hero';
import SignInForm from '@/components/SignForms/SignInForm';

const ConnexionPage = () => {
  return (
    <Hero
      header="Contents de vous revoir !"
      paragraphs={[]}
      image="images/waiter-smiling.jpg"
      imageAlt="Notre serveuse Magalie vous attend"
      childComponents={[<SignInForm />]}
      $textIsLeft={false}
      $isOdd={true}
    />
  );
};

export default ConnexionPage;
