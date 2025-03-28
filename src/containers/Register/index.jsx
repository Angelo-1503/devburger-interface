import { set, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


import { Container, Form, InputContainer, LeftContainer, RightContainer, Title, Link } from "./styles";
import Logo from "../../assets/logo.svg";
import { Button } from "../../components/Button";
import { api } from "../../services/api"



export function Register() {
  const navigate = useNavigate()

  const schema = yup
    .object({
      name: yup.string().required('O nome é obrigatório'),
      email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
      password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Digite uma senha'),
      confirmPassword: yup.string().oneOf([yup.ref('password')], 'As senhas devem ser iguais').required('Confirme a senha'),
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      const { status } =
        await api.post('/users', {
          name: data.name,
          email: data.email,
          password: data.password,
        },
          {
            validateStatus: () => true,
          },
        );



      if (status === 201 || status === 200) {
        setTimeout(() => {
          navigate('/login')
        }, 2000)
        toast.success('Usuário cadastrado com sucesso!')
      } else if (status === 400) {
        toast.error('Email já cadastrado')
      } else {
        throw new Error()
      }
      console.log(status)
    }
    catch (error) {
      toast.error('Falha no sistema! Tente novamente mais tarde!')
    }
  }





  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="Logo-devburger" />
      </LeftContainer>


      <RightContainer>
        <Title>
          Criar Conta
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Name</label>
            <input type="text"  {...register("name")} />
            <p>{errors?.name?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Email</label>
            <input type="email" {...register("email")} />
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Senha</label>
            <input type="password"  {...register("password")} />
            <p>{errors?.password?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Confirmar Senha</label>
            <input type="password"  {...register("confirmPassword")} />
            <p>{errors?.confirmPassword?.message}</p>
          </InputContainer>
          <Button type="submit">Criar Conta</Button>

        </Form>

        <p>Já possui uma conta? <Link to="/login">Clique aqui</Link></p>
      </RightContainer>
    </Container>
  );
}
