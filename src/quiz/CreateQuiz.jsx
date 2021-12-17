import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { questions } from './exemploQuestions'

function CreateQuiz() {
  const [newQuestions, setNewQuestions] = useState([]);
  /*-- STATE DE CONTROLE DE LINHAS DO  CREATE --*/
  const [countLineCreate, setCountLineCreate] = useState(0);

  /*-- STATE DE CONTROLE DOS INPUT DE CRIAÇÃO DA LINHA ATIVA --*/
  const [question, setQuestion] = useState('');

  const handleChangeQuestion = (e) => { setQuestion(e.target.value) }

  /*-- FUNÇÕES PARA CONTROLE DE INCLUIR E EXCLUIR LINHAS NO MODAL DE CREATE --*/
  const handleIncrementNewLine = () => {

    if (!question) {
      return;
    }

    setQuestion('');

    const questionActive = {
      question,
    }
    console.log(questionActive, question, newQuestions)


    setCountLineCreate(countLineCreate + 1);
    setNewQuestions([...newQuestions, questionActive])

  }

  const handleDeleteLine = (index) => {
    console.log(index, newQuestions)
    const questionDeleteLine = newQuestions.splice(index - 1, 1);

    setQuestion('');

    setCountLineCreate(countLineCreate - 1);
    setNewQuestions(questionDeleteLine);
    runLines()
  }

  /*-- FUNÇÃO DE INSERÇÃO DE LINHAS PREENCHIDAS E LIMPAS NO MODAL DE CREATE --*/
  const runLines = () => {
    const lines = [];
    for (var i = 0; i <= countLineCreate; i++) {
      let pos = i;
      lines.push(
        <Grid
          container
          justifyContent="space-between"
          key={i}
          sx={{ mb: 2 }}
        >
          <Grid item sx={{ mt: 2 }}>
            <TextField
              disabled={countLineCreate !== i ? true : false}
              id="outlined-basic"
              onChange={handleChangeQuestion}
              value={
                countLineCreate === i
                  ? question
                  : newQuestions[i]?.question
              }
              label="Pergunta:"
              variant="outlined"
              size="small"
            />
          </Grid>
          {/* <Grid item sm={4} sx={{ mt: 2 }}>
            <TextField
              disabled={countLineCreate !== i ? true : false}
              id="outlined-basic"
              fullWidth
              onChange={handleChangeEmail}
              value={
                countLineCreate === i
                  ? email
                  : newQuestions[i]?.email
              }
              label="E-mail:"
              variant="outlined"
              size="small"
            />
          </Grid> */}
          {/* <Grid item sm={3} xs={9} sx={{ mt: 2 }}>
            <FormControl
              disabled={countLineCreate !== i ? true : false}
              sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-chip-label" size="small">Setor</InputLabel>
              <Select
                label="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                size="small"
                value={
                  countLineCreate === i
                    ? sectors
                    : newQuestions[i]?.sectors
                }
                onChange={handleChangeSectors}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) =>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} size="small"
                        label={setores && setores.map((sector) => {
                          return sector.nome === value ? sector.codigo : null;
                        })}
                      />

                    ))}
                  </Box>
                }
              >
                {setores && setores.map((sector) => (
                  <MenuItem key={sector.codigo} value={sector.nome}>
                    <Checkbox checked={
                      countLineCreate === i
                        ? sectors.indexOf(sector.nome) > -1
                        : newQuestions[i]?.sectors.indexOf(sector.nome) > -1
                    } />
                    <ListItemText primary={sector.nome} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> */}
          {countLineCreate === i ? (
            <Grid item sx={{ mt: 2 }}>
              <IconButton
                onClick={handleIncrementNewLine}
                color="primary"
                aria-label="adicionar nova pergunta"
                component="span"
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Grid>
          ) : (
            <Grid item sx={{ mt: 2 }}>
              <IconButton
                onClick={() => { handleDeleteLine(pos) }}
                color="error"
                aria-label="excluir pergunta"
                component="span"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Grid>
          )}
        </Grid>
      );
    }
    return lines;
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <h1>create</h1>
      {
        runLines()
      }
    </Container>
  );
}

export default CreateQuiz;

