import * as React from 'react';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails, { accordionDetailsClasses } from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import './styles.scss';

export default function AccordionList() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpansion = () => {
        setExpanded((prev) => !prev);
    };

    return (
        <div className='accordion__container'>

            <Accordion
                expanded={expanded}
                onChange={handleExpansion}
                slots={{ transition: Fade }}
                slotProps={{ transition: { timeout: 400 } }}
                className='accordion__content'
                sx={[
                    expanded
                        ? {
                            [`& .${accordionClasses.region}`]: {
                                height: 'auto',
                            },
                            [`& .${accordionDetailsClasses.root}`]: {
                                display: 'block',
                            },
                        }
                        : {
                            [`& .${accordionClasses.region}`]: {
                                height: 0,
                            },
                            [`& .${accordionDetailsClasses.root}`]: {
                                display: 'none',
                            },
                        },
                ]}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <span>🧘 Benefícios da Meditação</span>
                </AccordionSummary>
                <AccordionDetails>
                    <ul>
                        <li>Reduz estresse e ansiedade</li>
                        <li>Melhora o foco e a concentração</li>
                        <li>Promove bem-estar emocional</li>
                        <li>Ajuda no autoconhecimento</li>
                    </ul>
                </AccordionDetails>
            </Accordion>

            <Accordion className='accordion__content'>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <span>📖 Como Meditar</span>
                </AccordionSummary>
                <AccordionDetails>
                    <ol>
                        <li>Escolha um local calmo</li>
                        <li>Sente-se confortavelmente</li>
                        <li>Feche os olhos e foque na respiração</li>
                        <li>Observe os pensamentos sem julgamento</li>
                    </ol>
                </AccordionDetails>
            </Accordion>

            <Accordion className='accordion__content'>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <span>💡 Dicas para Iniciantes</span>
                </AccordionSummary>
                <AccordionDetails>
                    <ul>
                        <li>Pratique no mesmo horário diariamente</li>
                        <li>Use áudios guiados se necessário</li>
                        <li>Não se cobre por “meditar certo”</li>
                        <li>Comece com sessões de 5 minutos</li>
                    </ul>
                </AccordionDetails>
            </Accordion>

            <Accordion className='accordion__content'>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <span>❓ Perguntas Frequentes</span>
                </AccordionSummary>
                <AccordionDetails>
                    <p><strong>Preciso esvaziar a mente?</strong><br />Não. Apenas observe seus pensamentos sem se apegar a eles.</p>
                    <p><strong>Quanto tempo devo meditar?</strong><br />Comece com o tempo que for confortável. 5 a 10 minutos já ajudam.</p>
                    <p><strong>Posso meditar deitado?</strong><br />Sim, mas tome cuidado para não adormecer.</p>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}
