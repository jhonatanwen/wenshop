import {
  CatalogIcon,
  DocumentIcon,
  EmailIcon,
  FacebookIcon,
  HelpIcon,
  HomeIcon,
  InstagramIcon,
  LinkedinIcon,
  LocationIcon,
  PhoneIcon,
  PrivacyIcon,
  ShoppingCartIcon,
  TermsIcon,
  ThunderboltIcon,
  TwitterIcon,
  UserIcon,
} from "@/components/icons";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Coluna 1: Sobre a WenShop */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-xl shadow-lg">
                <ThunderboltIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">
                WenShop
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Sua loja online de tecnologia com os melhores produtos, preços
              imbatíveis e atendimento excepcional.
            </p>

            {/* Redes sociais */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <HomeIcon className="w-4 h-4" />
                  <span>Início</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <CatalogIcon className="w-4 h-4" />
                  <span>Produtos</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <ShoppingCartIcon className="w-4 h-4" />
                  <span>Carrinho</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Minha Conta</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Suporte */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Suporte</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <HelpIcon className="w-4 h-4" />
                  <span>Central de Ajuda</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <DocumentIcon className="w-4 h-4" />
                  <span>Política de Devolução</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <PrivacyIcon className="w-4 h-4" />
                  <span>Privacidade</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <TermsIcon className="w-4 h-4" />
                  <span>Termos de Uso</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Contato</h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 mt-1 text-primary-400">
                  <EmailIcon />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <p className="text-white font-medium">contato@wenshop.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 mt-1 text-primary-400">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Telefone</p>
                  <p className="text-white font-medium">(11) 1234-5678</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 mt-1 text-primary-400">
                  <LocationIcon />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Endereço</p>
                  <p className="text-white font-medium">
                    Av. Tecnologia, 1000
                    <br />
                    São Paulo, SP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl font-bold text-white">
              Receba nossas ofertas especiais
            </h3>
            <p className="text-gray-300">
              Cadastre-se e seja o primeiro a saber sobre promoções e novos
              produtos
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200">
                Inscrever
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center space-y-2">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} WenShop. Todos os direitos
            reservados.
          </p>
          <p className="text-gray-500 text-sm">
            Este é um projeto de portfólio feito por{" "}
            <Link
              className="text-blue-800 dark:text-blue-400 hover:underline"
              target="_blank"
              href={"https://github.com/jhonatanwen"}
            >
              @jhonatanwen
            </Link>
            , nada aqui é real.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
