package com.sp.somdiaa.grci.lib.service;

import com.sp.somdiaa.grci.lib.mapper.DocumentDtomapper;
import com.sp.somdiaa.grci.lib.repository.DocumentRepository;
import com.sp.somdiaa.grci.lib.security.jwt.JwtTokenUtils;
import com.sp.somdiaa.grci.lib.service.serviceImpl.DocumentServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;

import static reactor.core.publisher.Mono.when;

/**
 * Project Name : somdiaa-grci-microservices
 *
 * @author : Patrick.M
 * @version:
 */

@RunWith(SpringRunner.class)
public class BibliothequeServiceTest {

    @InjectMocks
    private DocumentServiceImpl documentService;

    @Mock
    private DocumentDtomapper documentDtomapper;

    @Mock
    private DocumentRepository documentRepository;

    @Mock
    private JwtTokenUtils jwtTokenUtils;

    @Test
    public void testGetDocumentById() {

    }

    /*@Test
    public void testLoadDocumentForm() throws Exception {
        String token = "";
        ArrayList<Long> perimetreIds = new ArrayList<>().;
        when(jwtTokenUtils.getPerimetreFormToken(token)).thenReturn()
    }*/


    @Test
    public void testServiceGetPlanActionById() throws Exception {

        PlanAction planAction = new PlanAction(
                1L,
                "plan d'action from unit test",
                null,
                0L,
                0L,
                null,
                null,
                null
        );
        PlanActionDto planActionDto = new PlanActionDto(
                1L,
                "plan d'action from unit test",
                null,
                0L,
                0L,
                null,
                null,
                null,
                null
        );
        Optional<PlanAction> OptionalPlanAction = Optional.of(planAction);

        when(planActionRepository.findById(1L)).thenReturn(OptionalPlanAction);
        when(planActionDtoMapper.apply(planAction)).thenReturn(planActionDto);

        PlanActionDto dtoResponse = planActionService.getPlanActionById(1L);
        assertThat(dtoResponse).isEqualTo(planActionDto);
    }

    @Test
    public void testCreerPlanAction() throws Exception {

        PlanActionDto planActionDtoRequest = new PlanActionDto(null, "create plan action from unit test", null, 0L,0L,null,null,null,null);
        PlanAction planActionRequest = new PlanAction(null, "create plan action from unit test", null, 0L, 0L, null, null, null);
        PlanAction planActionResponse = new PlanAction(1L, "create plan action from unit test", null, 0L, 0L,null,null,null);
        PlanActionDto planActionDto = new PlanActionDto(1L, "create plan action from unit test", null, 0L, 0L, null, null, null, null);

        when(planActionDtoMapper.mapToEntity(planActionDtoRequest)).thenReturn(planActionRequest);
        when(planActionRepository.save(any(PlanAction.class))).thenReturn(planActionResponse);
        when(planActionDtoMapper.apply(planActionResponse)).thenReturn(planActionDto);

        PlanActionDto dtoResponse = planActionService.creerPlanAction(planActionDtoRequest);
        assertThat(dtoResponse).isEqualTo(planActionDto);
    }

    @Test
    public void testModifierPlanAction() {
        PlanAction planAction = new PlanAction(
                1L,
                "create plan action from unit test",
                null,
                0L,
                0L,
                null,
                null,
                null);

        PlanActionDto planActionDto = new PlanActionDto(
                1L,
                "create plan action from unit test",
                null,
                0L,
                0L,
                null,
                null,
                null,
                null);

        PlanAction planActionResponse = new PlanAction(
                1L,
                "create plan action from unit test",
                null,
                0L,
                0L,
                null,
                new ArrayList<Long>(
                        List.of(1L, 2L, 3L)
                ),
                null);

        PlanActionDto planActionDtoResponse = new PlanActionDto(
                1L,
                "create plan action from unit test",
                null,
                0L,
                0L,
                new ArrayList<Long>(
                        List.of(1L, 2L, 3L)
                ),
                null,
                null,
                null);

        Optional<PlanAction> OptionalPlanAction = Optional.of(planAction);
        when(planActionRepository.findById(1L)).thenReturn(OptionalPlanAction);
        when(planActionDtoMapper.apply(planAction)).thenReturn(planActionDto);
        //when(planActionService.getPlanActionById(1L)).thenReturn(planActionDto);
        when(planActionDtoMapper.mapToEntity(planActionDtoResponse)).thenReturn(planActionResponse);
        when(planActionRepository.save(any(PlanAction.class))).thenReturn(planActionResponse);
        //when(planActionRepository.save(planAction)).thenReturn(planActionResponse);
        when(planActionDtoMapper.apply(planActionResponse)).thenReturn(planActionDtoResponse);

        PlanActionDto dtoResponse = planActionService.modifierPlanAction(1L, planActionDtoResponse);
        assertThat(dtoResponse).isEqualTo(planActionDtoResponse);
    }

    @Test
    public void testGetPlansActions() throws Exception {

        PlanActionDto planActionDto1 = new PlanActionDto(
                1L,
                "plan d'action from unit test",
                null,
                0L,
                0L,
                null,
                null,
                null,
                null
        );

        PlanActionDto planActionDto2 = new PlanActionDto(
                2L,
                "plan d'action from unit test",
                null,
                0L,
                0L,
                null,
                null,
                null,
                null
        );

        PlanAction planAction1 = new PlanAction(
                1L,
                "plan d'action from unit test",
                null,
                0L,
                0L,
                null,
                null,
                null
        );

        PlanAction planAction2 = new PlanAction(
                2L,
                "plan d'action from unit test",
                null,
                0L,
                0L,
                null,
                null,
                null
        );

        List<PlanAction> planActionList = List.of(planAction1, planAction2);
        Page<PlanAction> planActionPage = new PageImpl<>(planActionList);
        when(planActionRepository.findAll(PageRequest.of(0, 5))).thenReturn(planActionPage);
        //when(planActionPage.stream().map(planActionDtoMapper).toList()).thenReturn(planActionDtoList);
        when(planActionDtoMapper.apply(planAction1)).thenReturn(planActionDto1);
        when(planActionDtoMapper.apply(planAction2)).thenReturn(planActionDto2);

        Page<PlanActionDto> dtoResponse = planActionService.getPlansActions(0, 5);
        assertThat(dtoResponse).contains(planActionDto1, planActionDto2);
    }

}
