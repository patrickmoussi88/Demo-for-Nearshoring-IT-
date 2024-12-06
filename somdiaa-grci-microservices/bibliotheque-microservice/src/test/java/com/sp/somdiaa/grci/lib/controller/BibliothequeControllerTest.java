package com.sp.somdiaa.grci.lib.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import com.sp.somdiaa.grci.lib.service.DocumentService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.test.web.servlet.MvcResult;

/**
 * Project Name : somdiaa-grci-microservices
 *
 * @author : Patrick.M
 * @version:
 */

@RunWith(SpringRunner.class)
@SpringBootTest
@WebAppConfiguration
@ActiveProfiles("test")
@WithMockUser
public class BibliothequeControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @MockBean
    private DocumentService documentService;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @Test
    public void testGestDocumentById() {

    }


    @Test
    public void testGetPlansActions() throws Exception{

        PlanActionDto planActionDto1 = new PlanActionDto(
                1L,
                "plan d'action from unit test element 1",
                null,
                0L,
                0L,
                null,
                null,
                null,
                null
        );

        PlanActionDto planActionDto2 = new PlanActionDto(
                1L,
                "plan d'action from unit test element 2",
                null,
                0L,
                0L,
                null,
                null,
                null,
                null
        );

        List<PlanActionDto> listPlansActions = Stream.of(planActionDto1, planActionDto2).toList();
        Page<PlanActionDto> pageOfPlansActions = new PageImpl<>(listPlansActions);
        ResponseDto<Page<PlanActionDto>> responseDto = new ResponseDto<>(OK, "success", pageOfPlansActions);

        when(planActionService.getPlansActions(0, 5)).thenReturn(pageOfPlansActions);

        MvcResult mvcResult = this.mockMvc.perform(get("/api/v1/plan-action" )
                        .param("page", "0")
                        .param("size", "5")
                        .content("application/json"))
                .andExpect(status().isOk())
                .andReturn();

        String mockMvcResponse = mvcResult.getResponse().getContentAsString();

        ResponseDto<Page<PlanActionDto>> dtoResponse = new ObjectMapper().readValue(mockMvcResponse, new TypeReference<ResponseDto<Page<PlanActionDto>>>() {});
        Page<PlanActionDto> streamResult = dtoResponse.getData();

        assertThat(streamResult).contains(planActionDto1, planActionDto2);
    }


    @Test
    public void testGetPlanActionById() throws Exception{

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

        when(planActionService.getPlanActionById(1L)).thenReturn(planActionDto);

        MvcResult mvcResult = this.mockMvc.perform(get("/api/v1/plan-action/{id}", 1L)
                        .content("application/json"))
                .andExpect(status().isOk())
                .andReturn();

        String mockMvcResponse = mvcResult.getResponse().getContentAsString();
        ResponseDto<PlanActionDto> dtoResponse = new ObjectMapper().readValue(mockMvcResponse, new TypeReference<ResponseDto<PlanActionDto>>() {});
        assertThat(dtoResponse.getData()).isEqualTo(planActionDto);
    }

    @Test
    public void testCreatePlanAction() throws Exception{

        PlanActionDto planActionDtoRequest = new PlanActionDto(
                null,
                "creer plan d'action from unit test",
                null,
                0L,
                0L,
                null,
                null,
                null,
                null
        );

        PlanActionDto planActionDto = new PlanActionDto(
                1L,
                "creer plan d'action from unit test",
                null,
                0L,
                0L,
                null,
                null,
                null,
                null
        );

        ObjectMapper mapper = new ObjectMapper();
        String jsonPlanActionDtoRequest = mapper.writeValueAsString(planActionDtoRequest);

        when(planActionService.creerPlanAction(planActionDtoRequest))
                .thenReturn(planActionDto);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/v1/plan-action")
                .accept(MediaType.APPLICATION_JSON)
                .content(jsonPlanActionDtoRequest)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult mvcResult = this.mockMvc.perform(requestBuilder)
                .andExpect(status().isCreated())
                .andReturn();

        String mockMvcResponse = mvcResult.getResponse().getContentAsString();
        ResponseDto<PlanActionDto> dtoResponse = new ObjectMapper().readValue(mockMvcResponse, new TypeReference<ResponseDto<PlanActionDto>>() {});
        assertThat(dtoResponse.getData()).isEqualTo(planActionDto);
    }

    @Test
    public void testModifierPlanAction() throws Exception{

        PlanActionDto planActionDto = new PlanActionDto(
                1L,
                "plan d'action from unit test element 2",
                null,
                0L,
                0L,
                null,
                null,
                null,
                null
        );

        when(planActionService.modifierPlanAction(1L, planActionDto)).thenReturn(planActionDto);

        String jsonDtoResponse = new ObjectMapper().writeValueAsString(planActionDto);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .put("/api/v1/plan-action/{id}", 1L)
                .accept(MediaType.APPLICATION_JSON)
                .content(jsonDtoResponse)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult mvcResult = mockMvc.perform(requestBuilder)
                .andExpect(status().isOk())
                .andReturn();

        String mockMvcResponse = mvcResult.getResponse().getContentAsString();
        ResponseDto<PlanActionDto> dtoResponse = new ObjectMapper().readValue(mockMvcResponse, new TypeReference<ResponseDto<PlanActionDto>>() {});
        assertThat(dtoResponse.getData()).isEqualTo(planActionDto);
    }

    @Test
    public void testDocumenterPlanAction() throws Exception{

        PlanActionDto planActionDto = new PlanActionDto(
                1L,
                "plan d'action from unit test element 2",
                null,
                0L,
                0L,
                new ArrayList<Long>(
                        List.of(1L, 2L, 3L)
                ),
                null,
                null,
                null
        );

        when(planActionService.documenterPlanAction(1L, new ArrayList<Long>(List.of(1L, 2L, 3L))))
                .thenReturn(planActionDto);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .put("/api/v1/plan-action/{id}/add-documents", 1L)
                .accept(MediaType.APPLICATION_JSON)
                .content(
                        new ObjectMapper().writeValueAsString(
                                new ArrayList<Long>(List.of(1L, 2L, 3L))
                        )
                ).contentType(MediaType.APPLICATION_JSON);

        MvcResult mvcResult = mockMvc.perform(requestBuilder)
                .andExpect(status().isOk())
                .andReturn();

        String mockMvcResponse = mvcResult.getResponse().getContentAsString();
        ResponseDto<PlanActionDto> dtoResponse = new ObjectMapper().readValue(mockMvcResponse, new TypeReference<ResponseDto<PlanActionDto>>() {});
        assertThat(dtoResponse.getData()).isEqualTo(planActionDto);
    }

}
